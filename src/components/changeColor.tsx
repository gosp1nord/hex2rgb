import { useState } from "react";

interface inputElement {
  colorHex: string;
  textOut: string;
}
interface funcLineTask {
  props: Function
}

export const Changer = ({props}: funcLineTask) => {
  const [form, setForm] = useState<inputElement>({
    colorHex: "#",
    textOut: ''
  });
  let { textOut } = form;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    props ({
      errorClass: '#ffffff'
    })

    const result = validation(value);
    if (result.status === 'error') {
      textOut = 'ОШИБКА';
      props ({
        errorClass: '#ff0000'
      })
    } else {
      value = result.valueOut;
      textOut = result.rgb;
      props ({
        errorClass: result.rgb
      })
    }

    setForm((prevForm) => ({
      ...prevForm,
      colorHex: value,
      textOut: textOut
    }));
  };

  return (
    <form className="form" autoComplete="off">
      <input
        id="colorHex"
        className="styleColor"
        name="colorHex"
        type="text"
        value={form.colorHex}
        onChange={handleChange}
      />
      <div className="styleColor outRgb">{form.textOut}</div>
    </form>
  )
}

function validation(element: string) {
  const arrOut = {
    status: 'ok',
    valueOut: '#',
    rgb: ''
  }

  if (element !== '' && element[0] === '#') {
    let checkElement = element.slice(1)
    if (/[^0-9a-z]/.test(checkElement) || checkElement.length > 6) {
      arrOut.status = 'error'
    }

    if (checkElement.length === 6 && !/[^0-9a-z]/.test(checkElement)) {
      let result = hexToRGB(element);
      if (result !== '') {
        arrOut.rgb = result;
      } else {
        arrOut.status = 'error';
      }
    }
    arrOut.valueOut = element
  }
  return arrOut
}

function hexToRGB(hex: string) {
  let strOut = ''
  const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
  if (r && g && b) {
    strOut = "rgb(" + r + ", " + g + ", " + b + ")";
  }
  return strOut
}
