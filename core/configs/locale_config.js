
module.exports = {

  default: 'en-US',
  available: ['en-US', 'ru-RU'],
  fallback: '?',
  localizations: {
    "en-US": {
      lang: { // Выбор языка, информация о текущем языке
        title: 'English',
        reduction: 'eng'

      },
      auth: { // Локализация данных на страницах авторизации	 #### AUTH START EN
        pagetitle: 'Welcome to LAVA',
        title: 'Welcome',
        subtitle: 'to LAVA',
        singin: 'Sing in',
        singup: 'Sing up'
        


      },
      forms:{ // Поля форм
          email: 'Email',
          password: 'Password',
          singinbutton: 'Sing in now'

      },
      settings:{
        navtitle: 'Settings',
        logout: 'Log out'
      }
    },    
    "ru-RU": { 
      lang: { // Выбор языка, информация о текущем языке
        title: 'Русский',
        reduction: 'рус'
      },
      auth: { // Локализация данных на страницах авторизации  #### AUTH START RU
        pagetitle: 'Приветствуем в LAVA',
        title: 'Приетствуем',
        subtitle: ' в LAVA',
        singin: 'Войти',
        singup: 'Регистрация'
  
      },
      forms:{ // Поля форм
          email: 'Email',
          password: 'Пароль',
          singinbutton: 'Войти сейчас'

      },
      settings:{
        navtitle: 'Настройки',
        logout: 'Выйти'
      }
    }
  }
}





	
