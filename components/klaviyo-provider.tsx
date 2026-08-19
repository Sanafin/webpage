"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    klaviyo?: any
    _klOnsite?: any[]
  }
}

function initializeKlaviyoQueue() {
  if (window.klaviyo) return

  window._klOnsite = window._klOnsite || []

  try {
    window.klaviyo = new Proxy(
      {},
      {
        get(_target, method) {
          if (method === "push") {
            return (...args: any[]) => window._klOnsite?.push(...args)
          }

          return (...args: any[]) =>
            new Promise((resolve) => {
              const callback = typeof args[args.length - 1] === "function" ? args.pop() : undefined
              window._klOnsite?.push([
                method,
                ...args,
                (response: any) => {
                  callback?.(response)
                  resolve(response)
                },
              ])
            })
        },
      },
    )
  } catch {
    window.klaviyo = window.klaviyo || []
    window.klaviyo.push = (...args: any[]) => window._klOnsite?.push(...args)
  }
}

export function KlaviyoProvider() {
  useEffect(() => {
    // 1. Initialize the Klaviyo proxy object on window
    initializeKlaviyoQueue()

    // 2. Dynamically inject the Klaviyo external script tag via standard DOM injection
    // This bypasses next/script load tracking to prevent Next.js from throwing unhandled ProgressEvent overlay errors when blocked by ad-blockers.
    const scriptId = 'klaviyo-onsite-js';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://static.klaviyo.com/onsite/js/TrQgrr/klaviyo.js?company_id=TrQgrr';
      
      script.onerror = (err) => {
        console.warn("Klaviyo script load blocked by browser (adblocker/privacy Shield).");
      };
      
      document.head.appendChild(script);
    }

    // 3. Prevent unhandled rejections and script error overlays from Klaviyo network failures
    // Since ad-blockers block Klaviyo's internal tracking network requests, the Klaviyo SDK 
    // throws rejected promises or network errors that can crash Next.js in development mode.
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reasonStr = String(event.reason);
      if (
        reasonStr.includes('ProgressEvent') || 
        reasonStr.includes('[object ProgressEvent]') ||
        reasonStr.includes('klaviyo') ||
        (event.reason && typeof event.reason === 'object' && event.reason.toString?.().includes('ProgressEvent'))
      ) {
        event.preventDefault(); // Suppresses the Next.js red crash overlay
        console.warn("Handled and suppressed Klaviyo network rejection:", event.reason);
      }
    };

    const handleGlobalError = (event: ErrorEvent) => {
      const message = String(event.message || event.error);
      if (
        message.includes('ProgressEvent') || 
        message.includes('[object ProgressEvent]') ||
        message.includes('klaviyo')
      ) {
        event.preventDefault(); // Suppresses the Next.js red crash overlay
        console.warn("Handled and suppressed Klaviyo network load error:", event.message);
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleGlobalError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleGlobalError);
    };
  }, [])

  return null;
}
