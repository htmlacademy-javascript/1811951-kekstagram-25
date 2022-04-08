const UPLOAD_ADDRESS = 'https://25.javascript.pages.academy/kekstagram/';
const DOWNLOAD_ADDRESS = `${UPLOAD_ADDRESS}data`;

const serverRequest = (onLoad, onError) => {
  fetch(DOWNLOAD_ADDRESS)
    .then((response) => response.json())
    .then((data) => onLoad(data))
    .catch(onError);
};

const serverSave = (data, onSent, onError) => {
  fetch(UPLOAD_ADDRESS, {
    method: 'POST',
    body: data
  }).then((response) => {
    if (response.ok) {
      onSent();
    } else {
      onError();
    }
  });
};

export {
  serverRequest,
  serverSave
};
