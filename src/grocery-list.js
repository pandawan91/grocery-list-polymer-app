/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import './shared-styles.js';

class GroceryList extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }

        .input-container {
          padding: 10%;
          margin: 10%;
          border-style: solid;
        }

        paper-card {
          margin: 10px;
        }
      </style>

      <div class="card">
        <h1>Grocery List</h1>
        <div class="input-container">
          <paper-input 
            always-float-label             
            label="Name" 
            value="{{nameInput}}"></paper-input>
          <paper-input 
            always-float-label 
            label="Quantity" 
            allowed-pattern="[0-9]"
            value="{{quantityInput}}"></paper-input>
          <paper-button noink on-click="_pushToList">Add</paper-button>
        </div>        
      
        <template is="dom-repeat" items="[[groceryList]]">
          <paper-card heading="[[item.name]]">
          <div class="card-content">Quantity: [[item.quantity]]</div>
          <div class="card-actions">
            <paper-button noink on-click="_removeItem">Delete</paper-button>
          </div>
          </paper-card>        
        </template>
      </div>
    `;
  }

  static get properties() {
    return {
      groceryList: {
        type: Array,
        value: [
          {
            name: "soap bottle",
            quantity: 5
          },
          {
            name: "toilet paper",
            quantity: 50
          }
        ]
      },
      nameInput: String,
      quantityInput: Number
    };
  }

  _pushToList(event){
    if(this.nameInput && this.quantityInput)
    this.push('groceryList', {
      name: this.nameInput,
      quantity: this.quantityInput
    })
  }

  _removeItem(event){
    this.splice('groceryList', event.model.index, 1);
  }
}

window.customElements.define('grocery-list', GroceryList);
