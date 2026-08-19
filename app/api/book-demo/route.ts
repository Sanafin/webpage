import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, company, role, date, timeSlot, notes } = await request.json()

    if (!name || !email || !company || !role || !date || !timeSlot) {
      return NextResponse.json({ error: 'All fields (name, email, company, role, date, timeSlot) are required' }, { status: 400 })
    }

    const klaviyoApiKey = process.env.KLAVIYO_PRIVATE_API_KEY
    const klaviyoListId = process.env.KLAVIYO_LIST_ID

    // Log the booking locally for visibility
    console.log('[Sanafin Demo Booking] Received booking:', { name, email, company, role, date, timeSlot, notes })

    if (klaviyoApiKey && klaviyoListId) {
      // Structure name
      const nameParts = name.trim().split(' ')
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(' ') || ''

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
              custom_source: 'Demo Booking Form',
              profiles: {
                data: [
                  {
                    type: 'profile',
                    attributes: {
                      email: email,
                      first_name: firstName,
                      last_name: lastName,
                      organization: company,
                      properties: {
                        Role: role,
                        DemoDate: date,
                        DemoTimeSlot: timeSlot,
                        DemoNotes: notes || '',
                        DemoBookingStatus: 'CONFIRMED'
                      },
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
        console.error('[Sanafin Demo Booking] Klaviyo sync failed:', errorText)
        // We still return success as we logged the booking, but warn in logs
      } else {
        console.log('[Sanafin Demo Booking] Successfully synced booking to Klaviyo for:', email)
      }
    } else {
      console.warn('[Sanafin Demo Booking] Klaviyo API key or List ID not configured. Booking saved locally only.')
    }

    return NextResponse.json({ 
      success: true,
      message: 'Demo successfully booked'
    })
  } catch (error) {
    console.error('[Sanafin Demo Booking] Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
