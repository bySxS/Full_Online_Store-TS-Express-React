
export const validateUser = ({
  deliveryAddress,
  phoneNumber,
  fullName,
  nickname,
  email,
  password,
  rePassword
}: {
  deliveryAddress?: string
  phoneNumber?: string
  fullName?: string
  nickname?: string
  email?: string
  password?: string
  rePassword?: string
}) => {
  let isValid = true
  let deliveryAddressErr
  if ((typeof deliveryAddress !== 'undefined') &&
    deliveryAddress.trim() === '') {
    deliveryAddressErr = 'Пожалуйста, введите адрес доставки'
    isValid = false
  } else if ((typeof deliveryAddress !== 'undefined') &&
    deliveryAddress.length < 10) {
    deliveryAddressErr = 'Пожалуйста, введите полный адрес доставки'
    isValid = false
  }
  let phoneNumberErr
  if ((typeof phoneNumber !== 'undefined') &&
    phoneNumber.trim() === '') {
    phoneNumberErr = 'Пожалуйста, введите номер телефона'
    isValid = false
  } else if ((typeof phoneNumber !== 'undefined') &&
    phoneNumber.length > 0 && phoneNumber[0] !== '+') {
    phoneNumberErr = 'Пожалуйста, введите номер телефона начиная с +'
    isValid = false
  } else if ((typeof phoneNumber !== 'undefined') &&
    phoneNumber.length < 10) {
    phoneNumberErr = 'Пожалуйста, введите корректный номер телефона'
    isValid = false
  }

  let fullNameErr
  if ((typeof fullName !== 'undefined') &&
    fullName.trim() === '') {
    fullNameErr = 'Пожалуйста, введите ФИО'
    isValid = false
  } else if ((typeof fullName !== 'undefined')) {
    const countSpace = fullName.split(' ') || ['']
    if ((countSpace.length < 3) ||
      (countSpace.length > 2 &&
        countSpace[2].length < 4)) {
      fullNameErr = 'Пожалуйста, введите правильное ФИО'
      isValid = false
    }
  }

  let nicknameErr
  if ((typeof nickname !== 'undefined') &&
    nickname.trim() === '') {
    nicknameErr = 'Пожалуйста, введите никнейм'
    isValid = false
  }
  let emailErr
  if ((typeof email !== 'undefined') &&
    email.trim() === '') {
    emailErr = 'Пожалуйста, введите e-mail'
    isValid = false
  } else if ((typeof email !== 'undefined') &&
    (!email.includes('@') || !email.includes('.'))) {
    emailErr = 'Пожалуйста, введите корректный e-mail'
    isValid = false
  }

  let passwordErr
  let rePasswordErr
  if ((typeof password !== 'undefined') &&
    password.trim() === '') {
    passwordErr = 'Пожалуйста, введите пароль'
    isValid = false
  } else if ((typeof password !== 'undefined') &&
    password.length <= 6) {
    passwordErr = 'Пароль должен быть больше 6 символов'
    isValid = false
  }

  if ((typeof password !== 'undefined' &&
    typeof rePassword !== 'undefined') &&
    rePassword !== password) {
    rePasswordErr = 'Пароль не совпадает'
    isValid = false
  }
  return {
    success: isValid,
    errors: {
      deliveryAddress: deliveryAddressErr,
      fullName: fullNameErr,
      phoneNumber: phoneNumberErr,
      email: emailErr,
      nickname: nicknameErr,
      password: passwordErr,
      rePassword: rePasswordErr
    }
  }
}

export const validateProduct = ({
  title
}: {
  title?: string
}) => {
  let isValid = true
  let titleErr
  if ((typeof title !== 'undefined') &&
    title.trim() === '') {
    titleErr = 'Пожалуйста, введите название товара'
    isValid = false
  }
  return {
    success: isValid,
    errors: {
      title: titleErr
    }
  }
}
