import React, { useState } from 'react'
import TextInput from './TextInput'
import CheckConfirm from './CheckConfirm'
import { formDataToObject } from '../../utils/formData'
import styles from './Form.module.scss'

interface propsInterface {
  hidden: boolean
}

interface dataType {
  creator: string
  video_embed_url: string
}

interface errorType {
  creator?: string
  video_embed_url?: string
  confirmation?: string
}

export default function FormClip({ hidden }: propsInterface) {
  const [errors, setErrors] = useState<errorType>({})

  function onSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()

    const formData = new FormData(evt.currentTarget)

    const confirmation = !!formData.get('confirmation')
    formData.delete('confirmation')

    const data = formDataToObject(formData) as dataType

    data.creator = data.creator.trim()
    if (!data.creator) {
      return setErrors({ creator: "This field can't be empty" })
    }

    if (!data.video_embed_url) {
      return setErrors({ video_embed_url: "This field can't be empty" })
    }

    if (!confirmation) {
      return setErrors({ confirmation: 'You must confirm this' })
    }

    setErrors({})

    // ToDo call API to send data
    console.log(data)
  }

  return (
    <form
      className={`${styles.form} ${hidden ? styles.hide : ''}`}
      onSubmit={onSubmit}
    >
      <TextInput
        name="creator"
        label="The creator’s name is ..."
        error={errors.creator}
      />

      <TextInput
        name="video_embed_url"
        label="The link to the video is ..."
        error={errors.video_embed_url}
      />

      <h2>Preview</h2>

      {/*ToDo remove when preview component done*/}
      <div style={{ color: 'white', textAlign: 'center', margin: 40 }}>
        ---- Preview goes here ----
      </div>

      <CheckConfirm name="confirmation" error={errors.confirmation} />

      <input type="submit" className={styles.button_submit} value="Submit" />
    </form>
  )
}
