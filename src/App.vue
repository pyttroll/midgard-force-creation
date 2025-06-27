<template>
  <header class="nav-bar-header">
    <div class="nav-bar">
      <nav>
        <img src="./assets/midgard-logo.png" alt="Midgard Heroic Battles logo" />
        <RouterLink to="/">Forces</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style lang="scss">
:root {
  --base-font: 'Lusitana', serif;
  --font-form: 'Geist Mono';
  --font-decorative: 'Uncial Antiqua', serif;

  --color-brown-extra-light: #f8f9fa;
  --color-brown-super-light: #e3d4c8;
  --color-brown-lighter: #d8c6b7;
  --color-brown-light: #d2bba8;
  --color-brown-medium-light: #876a41;
  --color-brown-medium: #775a32;
  --color-brown-dark: #816a57;
  --color-dark: #020102;

  --color-grey-extra-light: #eee;
  --color-grey-light: #ddd;
  --color-grey-medium: #ccc;
  --color-grey: #aaa;

  --color-links: #0e627e;
  --multiselect-blue: #35495e;
  --color-grey-darker: #444443;
  --color-grey-dark: #676766;
}

html {
  font-size: 62.5%;
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
}

@media only screen and (-webkit-min-device-pixel-ratio: 3) {
  /* CSS */
  html {
    font-size: 50%;
  }

  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.8rem;
  }

  //.well {
  //   b {
  //     font-size: 0.9rem;
  //   }
  // }

  table {
    // width: 50vw;
    thead {
      tr {
        th {
          padding: 0;
        }
      }
    }
    tbody {
      tr {
        td {
          padding: 0;
        }
        &:nth-of-type(2) {
          td:nth-of-type(2) {
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}

body {
  color: #221f20;
  font-size: 1.4rem;
  font-weight: 400;
  font-family: var(--base-font);
  background-color: #faf0ea;
  margin: 0;
  margin-top: 4rem;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
  // min-width: 640px;
}

a {
  font-family: var(--base-font);
  color: var(--color-links);
  font-weight: bold;
  font-size: 1.2em;
}

hr {
  border: 0;
  border-top: 1px solid var(--color-grey-light);
  margin: 1rem 1rem;
}

input {
  font-family: var(--font-form);
  font-size: 1.4rem;
  padding: 0.3rem 1rem;
  border: 1px solid var(--color-grey-light);
  border-radius: 0.4rem;
  color: #35495e;
}
input[type='text'] {
  width: 100%;
}

label.checkbox {
  display: flex;
  align-items: center;
  font-family: var(--font-form);
  input[type='checkbox'] {
  }
  span {
    margin-left: 0.6rem;
  }
}

button {
  font-family: var(--font-form);
  font-size: 1.4rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-brown-light);
  border-radius: 0.4rem;
  color: #35495e;
  background-color: var(--color-brown-extra-light);
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #e9ecef;
  }

  &.danger {
    border: 1px solid #dc3545;
    color: #fff;
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
    }
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-decorative);
  font-weight: 300;
  font-variant: small-caps;
  margin: 0 0 0.6rem;
}

.well {
  h1,
  h2 {
    margin: 0;
  }
  // box-shadow: 0 0.2rem 0.3rem rgba(0, 0, 0, 0.3);
  // background-color: var(--color-brown-light);
  padding: 1.2rem 1.6rem;
  border-radius: 0.6rem;

  .columns {
    display: flex;
    width: 100%;
    .column-left {
      display: flex;
      flex-direction: column;
    }
    .column-right {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      align-items: flex-end;
      justify-content: flex-end;
      gap: 1rem;
      margin-right: 7.5rem;
    }
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 1rem;
    }
  }
}

table {
  background: #fff;
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  border-top: solid 1px var(--color-dark);
  border-left: solid 1px var(--color-dark);
  margin-bottom: 2rem;
  thead {
    tr {
      th {
        border-bottom: solid 1px var(--color-dark);
        border-right: solid 1px var(--color-dark);
        padding: 0.6rem 1.2rem;
        background-color: var(--color-brown-super-light);
        text-align: center;
      }
      &.merged {
        th {
          background-color: var(--color-brown-light);
          font-family: var(--font-decorative);
          padding: 0.3rem 1rem;
          font-weight: 300;
          font-variant: small-caps;
          font-size: 1.2em;
        }
      }
    }
  }
  tbody {
    tr {
      td {
        padding: 0.3rem 1rem;
        border-bottom: solid 1px var(--color-dark);
        border-right: solid 1px var(--color-dark);
        text-align: center;

        &:first-of-type {
          text-align: left;
        }
      }

      &.spell,
      &.trait {
        td {
          text-align: left;
          &:first-of-type {
            font-weight: bold;
            font-style: italic;
            text-align: left;
          }
          &:last-of-type {
            font-size: 0.9em;
          }
        }
      }
      &.custom-trait {
        td {
          text-align: left;
          &:first-of-type {
            font-weight: bold;
            font-style: italic;
            text-align: left;
          }
          &:last-of-type {
            font-size: 0.9em;
          }
          &:nth-of-type(2) {
            text-align: right;
          }
        }
      }
      &.section {
        background-color: var(--color-brown-super-light);
        td {
          font-weight: bold;
          font-style: italic;
          text-align: left;
          &:first-of-type {
            text-transform: uppercase;
          }
          &.has-no-traits {
            font-weight: normal;
            font-style: normal;
            text-transform: none;
          }
        }
      }
    }
  }
  tfoot {
    tr {
      background-color: var(--color-grey-extra-light);
      &.section {
        background-color: var(--color-brown-super-light);
      }
      td {
        padding: 0.6rem 0.8rem;
        border-bottom: solid 1px var(--color-dark);
        border-right: solid 1px var(--color-dark);
      }
    }
    input[type='text'],
    input[type='number'] {
      width: calc(100% - 2.4rem);
    }
    input[type='number'] {
      text-align: right;
    }
  }
}

.multiselect {
  font-family: var(--font-form);
  font-size: 1.4rem;
  min-height: 2.8rem;

  .multiselect__content-wrapper {
    box-shadow: 0 0 0.6rem rgba(0, 0, 0, 0.3);
  }
  .multiselect__tags {
    padding: 0.4rem 4rem 0 0.6rem;
    min-height: 2.8rem;

    .multiselect__tag {
      margin-bottom: 0;
      background: var(--color-brown-medium);
    }
    .multiselect__tag-icon::after {
      color: #fff;
    }
  }

  .multiselect__option--highlight {
    background: var(--color-brown-medium);
    color: #fff;
  }

  .multiselect__select {
    height: 2.8rem;
  }
  .multiselect__single,
  .multiselect__input {
    font-size: 1.4rem;
  }
  .multiselect__single {
    margin-bottom: 0;
  }
  .multiselect__placeholder {
    margin-bottom: 0;
    padding-top: 0;
  }
}

.form-row {
  display: flex;
  margin: 0.6rem;
  align-items: center;
  font-family: var(--font-form);

  &.align-top {
    align-items: flex-start;
    .label {
      margin-top: 0.8rem;
    }
  }

  .label {
    flex-basis: 10rem;
    flex-shrink: 0;
    text-align: right;
    padding-right: 1rem;
    font-weight: bold;
    font-family: var(--base-font);
  }

  .field {
    flex-basis: 100%;
    display: flex;
    align-items: center;

    label {
      margin-top: 0rem;
      margin-right: 2rem;
      margin-bottom: 0.2rem;

      input[type='checkbox'] {
        top: 0.2rem;
        position: relative;
        margin-right: 0.6rem;
      }

      span {
        margin-top: 0.3rem;
      }
    }

    ul.options {
      margin: 0.6rem 0;
      padding: 0;

      li {
        list-style: none;
        display: flex;
        align-items: center;
        margin-bottom: 0.2rem;
      }
    }
  }

  .actions {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}

header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
}

.nav-bar {
  background-color: var(--color-grey-darker);
  box-shadow: 0 0.2rem 0.3rem rgba(0, 0, 0, 0.3);
  border-bottom: 2px solid var(--color-dark);
  z-index: 2;
  img {
    height: 3.2rem;
    margin: -0.6rem 0;
  }
  nav {
    display: flex;
    align-items: center;
    > * {
      margin-right: 1rem;
      color: #fff;
      display: block;
      padding: 1rem 2.4rem;
      font-family: var(--font-form);
      text-decoration: none;

      &[aria-current='page'] {
        font-weight: bold;
        background-color: var(--color-grey-dark);
      }
    }
  }
}

.badge {
  display: inline-block;
  background-color: var(--color-grey-medium);
  padding: 0.3rem 0.6rem;
  border-radius: 0.8rem;
  color: var(--multiselect-blue);

  &.small {
    font-size: 0.9em;
    background-color: var(--color-grey-light);
    color: var(--color-font);
  }
}

.force-item-table-container {
  position: relative;

  .contingent {
    position: absolute;
    background-color: #fff;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3rem;
    border: solid #221f20 2px;
    top: -1rem;
    left: -1rem;
    font-weight: 700;
    box-shadow: 2px 2px 8px #00000033;
  }
}

@media print {
  #__vue-devtools-container__ {
    display: none;
  }

  body {
    margin-top: 0;
    background-color: #fff;
  }

  .nav-bar-header {
    display: none;
  }
}

@media only screen and (max-width: 640px) {
  button {
    font-size: 1.2rem;
    padding: 0.3rem 0.8rem;
  }
  .well .actions button {
    margin-left: 0.6rem;
  }
  .nav-bar {
    font-size: 0.8em;
    img {
      // height: 2.6rem;
      margin: 0;
    }
    nav {
      > * {
        padding: 0.6rem 0.8rem;
      }
    }
  }
}
</style>
