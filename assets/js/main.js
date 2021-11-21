function createCalculator() {
  const display = document.querySelector('.display');
  const historic = document.querySelector('.historic');
  const keyList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '(', ')', '.', '-', '+', '/', '*', 'Enter', '=', 'Delete', 'Backspace', '«', 'C'];

  return {
    display: display,
    historic: historic,
    keyList: keyList,

    run() {
      window.addEventListener('keydown', e => {
        const { key } = e;

        if (this.keyList.findIndex(x => x === key) != -1) {
          switch (key) {
            case 'Backspace':
              this.backspace();
              break;
            case 'Enter':
              this.calculate();
              break;
            case 'Delete':
              this.clean();
              break;
            case '=':
            case 'C':
              break;
            default:
              if (!(document.hasFocus() && document.activeElement === this.display))
                this.display.value += key;
          }
        }
      });

      window.addEventListener('click', e => {
        const { innerText } = e.target;

        if (this.keyList.findIndex(x => x === innerText) != -1) {
          switch (innerText) {
            case '«':
              this.backspace();
              break;
            case '=':
              this.calculate();
              break;
            case 'C':
              this.clean();
              break;
            default:
              if (!(document.hasFocus() && document.activeElement === this.display))
                this.display.value += innerText;
          }
        }
      });

      this.historic.addEventListener('click', e => {
        const { target } = e;

        if (target.classList.contains('historic-item')) {
          if (target.innerText === 'Reset Historic') {
            while (this.historic.children.length > 0) {
              this.historic.firstChild.remove();
              console.log('test')
            }
          }
          else {
            this.setValueOnDisplay(eval(target.innerText));
            const { parentElement } = target;

            target.parentElement.remove();
            this.appendHistoricItem(parentElement.innerText);
          }
        }
      });

      this.clean();
    },

    backspace() {
      if (!(document.hasFocus() && document.activeElement === this.display))
        this.setValueOnDisplay(this.display.value.slice(0, -1));
    },

    clean() {
      console.log('cleaning!');
      this.setValueOnDisplay('');
    },

    createHistoricItem(value) {
      const li = document.createElement('li');
      const button = document.createElement('button');

      button.innerText = value;
      button.classList += 'historic-item';
      li.appendChild(button);
      return li;
    },

    createResetButton() {
      const button = this.createHistoricItem('Reset Historic');
      return button;
    },

    appendHistoricItem(value) {
      const item = this.createHistoricItem(value);
      if (historic.children.length === 0)
        this.historic.appendChild(this.createResetButton());
      this.historic.appendChild(item);
    },

    setValueOnDisplay(value) {
      this.display.value = value;
    },

    calculate() {
      try {
        const value = eval(this.display.value);

        if (!value) {
          alert('Invalid operation!');
          return;
        }

        if (!(document.hasFocus() && document.activeElement === this.display))
          this.appendHistoricItem(this.display.value);
        this.setValueOnDisplay(value);
      } catch (e) {
        console.log(e);
        alert('Invalid operation!');
        this.clean();
      }
    }
  }
}

const calculator = createCalculator();
calculator.run();
