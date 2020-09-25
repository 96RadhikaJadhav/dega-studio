class TwitterEmbbed {
  constructor({ data, api }) {
    this.data = data;
    this.nodes = {};
    this.api = api;

    this.nodes.wrapper = document.createElement('div');

    var embbedContainer = document.createElement('div');

    this.nodes.wrapper.appendChild(embbedContainer);

    var inputContainer = document.createElement('div');
    var inputValue = document.createElement('input');
    var submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.innerHTML = 'Embed';

    submitButton.onclick = () => {
      let url = new URL(inputValue.value);
      let params = new URLSearchParams(url.search);
      if (params.has('v')) {
        this.data['id'] = params.get('v');
        this.nodes.wrapper.children[0].innerHTML =
          '<iframe width="560" height="315" src="https://www.youtube.com/embed/' +
          params.get('v') +
          '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

        inputContainer.style.display = 'none';
      }
    };

    inputContainer.appendChild(inputValue);
    inputContainer.appendChild(submitButton);

    this.nodes.wrapper.appendChild(inputContainer);
  }

  static get toolbox() {
    return {
      title: 'Youtube',
      icon:
        '<svg enable-background="new 0 0 24 24" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg"><path d="m23.469 5.929.03.196c-.29-1.029-1.073-1.823-2.068-2.112l-.021-.005c-1.871-.508-9.4-.508-9.4-.508s-7.51-.01-9.4.508c-1.014.294-1.798 1.088-2.083 2.096l-.005.021c-.699 3.651-.704 8.038.031 11.947l-.031-.198c.29 1.029 1.073 1.823 2.068 2.112l.021.005c1.869.509 9.4.509 9.4.509s7.509 0 9.4-.509c1.015-.294 1.799-1.088 2.084-2.096l.005-.021c.318-1.698.5-3.652.5-5.648 0-.073 0-.147-.001-.221.001-.068.001-.149.001-.23 0-1.997-.182-3.951-.531-5.846zm-13.861 9.722v-7.293l6.266 3.652z"/></svg>',
    };
  }

  render() {
    return this.nodes.wrapper;
  }

  save(blockContent) {
    return this.data;
  }
}

export default TwitterEmbbed;
