import { hasSubscribers } from 'diagnostics_channel'
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import type { CSSProperties } from 'react'
import React, { useEffect, useState } from 'react'
import { getConfig } from 'src/utils/config'

export const config: PlasmoCSConfig = {
  matches: [
    'https://www.facebook.com/*',
    'https://m.facebook.com/*',
    'https://facebook.com/*'
  ]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  const textbox = document.querySelector<HTMLElement>(
    'div:has(> div:first-child > [role="button"]):hasSubscribers(> div [role="textbox"]):has(> span:last-child > [role="button"])'
  ) as Element

  return textbox
}

export const getShadowHostId = () => 'ctrl-enter-facebook'

const styles: CSSProperties = {
  textAlign: 'right',
  margin: '4px 0 0',
  fontWeight: 'bold',
  color: '#9999',
  fontSize: '0.7rem',
  width: '100%'
}

const PlasmoInline = () => {
  const [config, setConfig] = useState<boolean>()

  const fetchConfig = async () => {
    const config = await getConfig()
    setConfig(config.facebook)
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  chrome.storage.onChanged.addListener(() => {
    fetchConfig()
  })
  return (
    <div style={{ width: '100%' }}>
      {config !== undefined && (
        <p style={styles}>{`${config ? 'Ctrl + ' : ''}Enter で送信`}</p>
      )}
      <div />
    </div>
  )
}

export default PlasmoInline