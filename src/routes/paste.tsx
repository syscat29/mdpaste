import { useParams } from 'react-router'

export default function Paste() {
  let params = useParams()

  return (
    <>
      <head>
        <title>{params.pasteId}</title>
        <meta name='description' content='Welcome to React Router!' />
      </head>

      <div className='wrapper'>
        <h1 className='mt-4'>Paste Page</h1>
        <div className='p-4 mt-4 bg-neutral-900'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit atque,
          magnam fuga pariatur exercitationem nam possimus. Consectetur, minus
          qui, sed porro sunt magnam soluta delectus dolor consequuntur suscipit
          quaerat natus.
        </div>
      </div>
    </>
  )
}
