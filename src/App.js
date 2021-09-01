import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'components/Container';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import cardsApi from './services/card-api';
import Spinner from 'components/Loader';
import Modal from 'components/Modal';
import s from './App.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function App() {
  const [cardName, setCardName] = useState('');
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [isShow, setIsShow] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const handleFormSubmit = cardName => {
    setCardName(cardName);
    setCards(cards);
    setPage(page);
  };

  useEffect(() => {
    if (!cardName ) return;
    setStatus(Status.PENDING);

    cardsApi
      .fetchImages(cardName, page)
      .then(cards => {
        if (cards.length === 0) {
          setStatus(Status.IDLE);
          toast.info('Please, try again your request is not defind!');
        } else {
          setCards(
            prevCards => [...prevCards, ...cards],
            setStatus(Status.RESOLVED),
          );
        }
      })
      .catch(error => setError(error), setStatus(Status.REJECTED))
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  }, [cardName, page]);

  const incrementPage = () => {
    setPage(page => page + 1);
  };

  const toggleModal = modalImage => {
    setIsShow(isShow => !isShow);
    setModalImage(modalImage);
  };

  return (
    <Container>
      <div>
        <Searchbar onSubmit={handleFormSubmit} />
        {status === Status.IDLE && (
          <div className={s.div}>Please, write a card name!</div>
        )}
        {status === Status.PENDING && <Spinner />}
        {status === Status.REJECTED && <h1>{error.message}</h1>}
        {status === Status.RESOLVED && (
          <ImageGallery
            cards={cards}
            onClick={incrementPage}
            onImageClick={toggleModal}
          />
        )}
        {isShow && <Modal modalImage={modalImage} onClose={toggleModal} />}
        <ToastContainer autoClose={3000} />
      </div>
    </Container>
  );
}

export default App;

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

// export class App extends Component {
//   state = {
//     cardName: '',
//     cards: [],
//     error: false,
//     status: Status.IDLE,
//     page: 1,
//     isShow: false,
//     modalImage: '',
//   };

//   handleFormSubmit = cardName => {
//     this.setState(cardName);
//     this.setState({ cards: [] });
//     this.setState({ page: 1 });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevCard = prevState.cardName;
//     const nextCard = this.state.cardName;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     if (prevCard !== nextCard || prevPage !== nextPage) {
//       this.setState({ status: Status.PENDING });

//       cardsApi
//         .fetchImages(nextCard, nextPage)
//         .then(cards => {
//           if (cards.length === 0) {
//             this.setState({ status: Status.IDLE });
//             toast.info('Please, try again your request is not defind!');
//           } else {
//             this.setState(prevState => {
//               return {
//                 cards: [...prevState.cards, ...cards],
//                 status: Status.RESOLVED,
//               };
//             });
//           }
//         })
//         .catch(error => this.setState({ error, status: Status.REJECTED }))
//         .finally(() => {
//           window.scrollTo({
//             top: document.documentElement.scrollHeight,
//             behavior: 'smooth',
//           });
//         });
//     }
//   }

//   incrementPage = () => {
//     this.setState(prevState => {
//       return {
//         page: prevState.page + 1,
//       };
//     });
//   };

//   toggleModal = modalImage => {
//     this.setState(({ isShow }) => ({
//       isShow: !isShow,
//     }));
//     this.setState({ modalImage });
//   };

//   render() {
//     const { cards, error, status, isShow, modalImage } = this.state;

//     return (
//       <Container>
//         <div>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//           {status === Status.IDLE && (
//             <div className={s.div}>Please, write a card name!</div>
//           )}
//           {status === Status.PENDING && <Spinner />}
//           {status === Status.REJECTED && <h1>{error.message}</h1>}
//           {status === Status.RESOLVED && (
//             <ImageGallery
//               cards={cards}
//               onClick={this.incrementPage}
//               onImageClick={this.toggleModal}
//             />
//           )}
//           {isShow && (
//             <Modal modalImage={modalImage} onClose={this.toggleModal} />
//           )}
//           <ToastContainer autoClose={3000} />
//         </div>
//       </Container>
//     );
//   }
// }

// export default App;
