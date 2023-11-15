export function getToastSuccessMessage(): Object {
  return {
    icon: '😀',
    position: 'top-right',
    duration: 2000,
    style: getToastSuccessStyle(),
  };
}

export function getToastErrorMessage(): Object {
  return {
    icon: '😞',
    position: 'top-right',
    duration: 2000,
    style: getToastErrorStyle(),
  };
}

export function getToastSuccessStyle(): Object {
  return {
    border: '1px solid #1a56db',
    padding: '16px',
    color: '#1a56db',
    background: '#93d7b0',
  };
}

export function getToastErrorStyle(): Object {
  return {
    border: '1px solid red',
    padding: '16px',
    color: 'red',
    background: '#FFBABA',
  };
}
