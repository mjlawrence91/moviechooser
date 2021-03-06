export const elementID = '#movie-list-item-tmpl'

export const elementHTML = `
  <template id="movie-list-item-tmpl">
    <style>
      :host {
        display: block;
        cursor: pointer;
        margin-left: 5px;
        font-size: 18px;
      }

      .label {
        margin: 5px 0;
        display: inline-block;
        width: 55px;
        padding: 3px 9px 4px;
        font-size: 75%;
        color: #FFF;
        border-radius: 3px;
        font-weight: normal;
        text-transform: uppercase;
        text-align: center;
        box-shadow: 1px 1px 4px rgba(0,0,0,0.4);
      }

      .movie-name {
        margin-left: 5px;
      }

      a.remove {
        color: #666;
        text-decoration: none;
      }

      a.remove:hover {
        text-decoration: underline;
      }

      .alex { background-color: #9C27B0; }
      .charl { background-color: #4CAF50; }
      .matt { background: #2196F3; }
      .rob { background-color: #F44336; }
    </style>

    <span class="label">Hello World</span>
    <a class="remove" href="javascript:void(0)">
      <span class="movie-name"></span>
    </a>
  </template>
`
