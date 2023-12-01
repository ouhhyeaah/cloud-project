import '../css/App.css'
import TopBar from '../Components/topBar'
import '../css/Profile.css'
import UserInfoComponent from '../Components/userInfoComponent'
import { useEffect, useState } from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'
import LoaderComponent from '../Components/LoaderComponent'

const Profile = () => {
  const email = localStorage.getItem('email')
  const [responseData, setResponseData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://unl87haa1i.execute-api.us-east-1.amazonaws.com/dev/list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email }),
        })
          .then((response) => response.json())
          .then((data) => {
            setResponseData(data)
          })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, []) // Assurez-vous de passer une dépendance vide pour exécuter useEffect une seule fois


  return (
    <div>
      <TopBar />
      <div className={'profile-container'}>

        <div>
          <h1 className={'center'}>Votre profil {email} !</h1>

          <div className={'form_body'}>
            <div className={'forms'}>
              {!responseData ? (
                <LoaderComponent />

              ) : (
                <UserInfoComponent userInfo={responseData} />
              )}
            </div>

            <button className={'save-button'}>Sauvegarder <BsCheckCircleFill /></button>
          </div>


        </div>


      </div>

    </div>
  )
}

export default Profile