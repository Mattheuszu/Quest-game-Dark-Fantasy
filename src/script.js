const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Вы просыпаетесь в странном месте и видите рядом с собой банку с синей слизью.',
    options: [
      {
        text: 'Взять слизь',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Оставить слизь',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Вы отправляетесь на поиски ответов о том, где вы находитесь, когда встречаете торговца.',
    options: [
      {
        text: 'Обменять слизь на меч',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Обменять слизь на щит',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Игнорировать торговца',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'После того, как вы покидаете торговца, вы начинаете чувствовать усталость и натыкаетесь на маленький городок рядом с опасно выглядящим замком.',
    options: [
      {
        text: 'Исследовать замок',
        nextText: 4
      },
      {
        text: 'Найти комнату для сна в городе',
        nextText: 5
      },
      {
        text: 'Найти сено в конюшне, чтобы поспать',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Вы настолько устали, что засыпаете, исследуя замок, и вас убивает какое-то страшное чудовище во сне.',
    options: [
      {
        text: 'Начать заново',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Без денег на комнату вы вломились в ближайший трактир и уснули. Через несколько часов хозяин трактира нашел вас и стража города посадила вас в клетку.',
    options: [
      {
        text: 'Начать заново',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Вы просыпаетесь отдохнувшим и полным энергии, готовым исследовать ближайший замок.',
    options: [
      {
        text: 'Исследовать замок',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'Исследуя замок, вы натыкаетесь на ужасное чудовище на вашем пути.',
    options: [
      {
        text: 'Попробовать убежать',
        nextText: 8
      },
      {
        text: 'Атаковать его мечом',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Спрятаться за щитом',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Бросить в него синюю слизь',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Ваши попытки убежать напрасны, и чудовище легко вас ловит.',
    options: [
      {
        text: 'Начать заново',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Вы глупо думали, что это чудовище можно убить одним мечом.',
    options: [
      {
        text: 'Начать заново',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Чудовище засмеялось, когда вы спрятались за щитом, и съело вас.',
    options: [
      {
        text: 'Начать заново',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Вы бросили свою банку со слизью в чудовище, и она взорвалась. После того как пыль улеглась, вы увидели, что чудовище уничтожено. Увидев свою победу, вы решили захватить этот замок и жить там до конца своих дней.',
    options: [
      {
        text: 'Поздравляем. Сыграть снова.',
        nextText: -1
      }
    ]
  }
]

startGame()
