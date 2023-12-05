import React from 'react'
import '../css/Home.css'
import { BsPersonFill } from 'react-icons/bs'

const PostsHomePage = ({ posts }) => {


  return (
    <div className={'main-container'}>
      <div className={'wrap-container'}>
        <div className={'posts-container'}>
          {posts.map((key) => (
              <div className={'post-container'}>
                <div className={'user-container'}>
                  <p>De <span className={'email'}> {key.email} </span></p>
                  <BsPersonFill size={24} />
                  <p> Créer le {key.createdAt.split('|')[0]} à {key.createdAt.split('|')[1]}</p>
                </div>
                <h2>{key.title}</h2>
                <p>{key.description}</p>
                <div className={'contact-link'}>
                  <a href={'mailto:' + key.email}>Contacter l'annonceur</a>
                </div>
              </div>
            ),
          )
          }
        </div>
      </div>

    </div>
  )
}
export default PostsHomePage