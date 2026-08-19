import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const klaviyoApiKey = process.env.KLAVIYO_PRIVATE_API_KEY
    const klaviyoListId = process.env.KLAVIYO_LIST_ID

    if (!klaviyoApiKey || !klaviyoListId) {
      console.error('[Sanafin] Klaviyo credentials are not configured in environment variables')
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
    }

    const klaviyoRes = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'revision': '2026-04-15',
      },
      body: JSON.stringify({
        data: {
          type: 'profile-subscription-bulk-create-job',
          attributes: {
            custom_source: 'Marketing Waitlist Form',
            profiles: {
              data: [
                {
                  type: 'profile',
                  attributes: {
                    email: email,
                    subscriptions: {
                      email: {
                        marketing: {
                          consent: 'SUBSCRIBED',
                        },
                      },
                    },
                  }
                }
              ]
            }
          },
          relationships: {
            list: {
              data: {
                type: 'list',
                id: klaviyoListId,
              }
            }
          }
        }
      }),
    })

    if (!klaviyoRes.ok) {
      const errorText = await klaviyoRes.text()
      console.error('[Sanafin] Klaviyo error response:', errorText)
      return NextResponse.json({ error: 'Failed to sync with waitlist' }, { status: 500 })
    }

    console.log('[Sanafin] Successfully queued subscription in Klaviyo for:', email)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Sanafin] Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
