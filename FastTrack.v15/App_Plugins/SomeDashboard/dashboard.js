class SomeDashboard extends HTMLElement {

  constructor() {
    super();

    const h1 = document.createElement('h1');
    h1.innerHTML = 'Some Dashboard';

    this.appendChild(h1);
  }

}

customElements.define("some-dashboard-element", SomeDashboard);

export {
  SomeDashboard as element
};
