import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import type { CSSProperties, IframeHTMLAttributes } from 'react'
import React, { useEffect, useState } from 'react'
import { getConfig } from 'src/utils/config'

export const config: PlasmoCSConfig = {
  matches: ['https://zoom.us/wc/*', 'https://pwa.zoom.us/wc/*']
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  const textbox = (
    document.querySelector<HTMLElement>('iframe#webclient') as HTMLIFrameElement
  )?.contentWindow?.document.querySelector<HTMLElement>(
    '#chatContainer + .chat-rtf-box__editor-outer'
  ) as Element
  return textbox
}

export const getShadowHostId = () => 'ctrl-enter-zoom'

const styles: CSSProperties = {
  textAlign: 'right',
  margin: '-4px 0 4px',
  fontWeight: 'bold',
  color: '#9999',
  fontSize: '0.7rem',
  padding: '0 8px',
  boxSizing: 'border-box',
  width: '100%'
}

const PlasmoInline = () => {
  const [config, setConfig] = useState<boolean>()

  const fetchConfig = async () => {
    const config = await getConfig()
    setConfig(config.zoom)
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  chrome.storage.onChanged.addListener(() => {
    fetchConfig()
  })
  const textCount =
    document
      .querySelector<HTMLIFrameElement>('iframe#webclient')
      ?.contentWindow?.document.getElementsByTagName('plasmo-csui')?.length ?? 0

  if (textCount < 2)
    return (
      <div style={{ width: '100%' }}>
        {config !== undefined && (
          <p style={styles}>{config ? 'Ctrl + ' : '' + 'Enter で送信'}</p>
        )}
        <div />
      </div>
    )
}

export default PlasmoInline
