/** @format */

import { useState, useEffect } from "react";

/* this custom hook fetches the backend and creates a nightOut Object in the database */
const useCreateNightOut = (token) => {
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");

  async function createNightOut(e) {
    e.preventDefault();

    // Error Handling
    if (e.target.title.value.length < 2) {
      setError("Please enter a title, or at least 2 characters.");
      setTimeout(() => {
        setError(false);
      }, 5000);
      return { data, success, error };
    }

    // Error Handling
    if (e.target.title.value.length > 39) {
      setError("Ensure that your title has not more than 40 characters.");
      setTimeout(() => {
        setError(false);
      }, 5000);
      return { data, success, error };
    }

    let response = await fetch(
      process.env.REACT_APP_API_URL + "nightoutlist/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        body: JSON.stringify({
          title: e.target.title.value,
        }),
      }
    );
    let thisData = await response.json();

    // check the response
    if (response.status === 201) {
      setSuccess("Your nightout is beeing created");
      setData(thisData);
      // send user to the new nightout
      setTimeout(function () {
        window.location.href = "/nightout/" + thisData.uuid;
      }, 5000);
    } else {
      setError("Something went wrong");
      setData(thisData);
    }
  }
  return { data, error, setError, success, createNightOut };
};

/* this custom hook fetches the bakend for the data of the nighOut */
const useGetNightOut = (token, uuid) => {
  const [nightOut, setNightOut] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getNightOut(uuid) {
    let response = await fetch(
      process.env.REACT_APP_API_URL + "nightout/" + uuid,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      }
    );
    let thisData = await response.json();

    if (response.status === 200) {
      setNightOut(thisData);
      setSuccess("Nightout loaded");
      setLoading(false);
    } else {
      setError("You are not participating in this nightOut");
      setNightOut(thisData);
      setLoading(false);
    }
  }

  useEffect(() => {
    getNightOut(uuid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid, token]);

  return { getNightOut, nightOut, error, setError, success, loading };
};

/* this custom hook fetches the backend for all nightouts that a user is participating in */
const useGetNightOutList = (token) => {
  const [nightOutList, setNightOutList] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  const getNightOutList = async () => {
    let response = await fetch(
      process.env.REACT_APP_API_URL + "nightoutlist/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      }
    );
    let thisData = await response.json();

    if (response.status === 200) {
      setNightOutList(thisData);
      setSuccess("Nightoutlist loaded");
      setLoading(false);
    } else {
      setError("Something went wrong");
      setNightOutList(thisData);
      setLoading(false);
    }
  };
  useEffect(() => {
    getNightOutList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return { getNightOutList, nightOutList, error, success, loading };
};

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

export {
  useCreateNightOut,
  useGetNightOut,
  useGetNightOutList,
  useAddParticipantToNightOut,
};
