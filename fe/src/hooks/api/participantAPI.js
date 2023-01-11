import { useState } from "react";


/* this custom hook fetches the backend to add an user to a nightout as a participant*/
const useAddParticipantToNightOut = (token, uuid, getNightOut) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [data, setData] = useState(null);
  
    const addParticipantToNightOut = async (e) => {
      e.preventDefault();
  
      let response = await fetch(process.env.REACT_APP_API_URL + "participant/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        body: JSON.stringify({
          nightOut: uuid,
          user: e.target.email.value,
        }),
      });
      const thisData = await response.json();
  
      if (response.status === 201) {
        setSuccess("Participant successfully added to your Nightout.");
        setData(thisData);
        setTimeout(() => {
            setError(false);
          }, 5000);
        getNightOut(uuid);
      } else if (response.status === 409) {
        setError(
          "It seems like the person you want to add, is allready participating in this Nightout."
        );
        setTimeout(() => {
          setError(false);
        }, 5000);
        setData(thisData);
      } else {
        setError(
          "A user with that email does not exist. Or your friend did not create an account. Try again or ask your friend to create an account."
        );
        setTimeout(() => {
          setError(false);
        }, 5000);
        setData(thisData);
      }
    };
    return {
      addParticipantToNightOut,
      error,
      success,
      data,
      setError,
      setSuccess,
    };
  };

  export {useAddParticipantToNightOut}