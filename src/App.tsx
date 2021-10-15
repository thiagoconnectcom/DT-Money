import { useState } from 'react';
import Modal from 'react-modal'
import { GlobalStyle } from "./styles/global"

//components
import { Header } from "./components/Header"
import { Dashboard } from "./components/Dashboard";
import { NewTransactionModal } from './components/NewTransactionModal';

//context
import { TransactionsProvider } from './hooks/useTransactionsContext';

Modal.setAppElement('#root');

export default function App () {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenTransactionModal () {
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseTransactionModal () {
    setIsNewTransactionModalOpen(false)
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenTransactionModal} />
      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseTransactionModal}
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}