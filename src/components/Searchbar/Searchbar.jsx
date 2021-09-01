import { useState } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

import React from 'react';

const Searchbar = ({ onSubmit }) => {
  const [cardName, setCardName] = useState('');

  const handleChange = e => {
    const value = e.currentTarget.value;
    setCardName(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (cardName.trim() === '') {
      toast.error("Oh no, you didn't write your request!");
      return;
    }
    onSubmit( cardName );
    setCardName('');
  };

  return (
    <div>
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            name="name"
            value={cardName}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </div>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

// class Searchbar extends Component {
//   state = {
//     cardName: '',
//   };

//   handleChange = e => {
//     const value = e.currentTarget.value;
//     this.setState({ cardName: value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     const { cardName } = this.state;

//     if (cardName.trim() === '') {
//       toast.error("Oh no, you didn't write your request!");
//       return;
//     }
//     this.props.onSubmit({ cardName });
//     this.reset();
//   };

//   reset = () => {
//     this.setState({ cardName: '' });
//   };

//   render() {
//     const { cardName } = this.state;
//     return (
//       <div>
//         <header className={s.Searchbar}>
//           <form className={s.SearchForm} onSubmit={this.handleSubmit}>
//             <button type="submit" className={s.SearchFormButton}>
//               <span className={s.SearchFormButtonLabel}>Search</span>
//             </button>

//             <input
//               className={s.SearchFormInput}
//               type="text"
//               name="name"
//               value={cardName}
//               onChange={this.handleChange}
//               autoComplete="off"
//               autoFocus
//               placeholder="Search images and photos"
//             />
//           </form>
//         </header>
//       </div>
//     );
//   }
// }

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

// export default Searchbar;
