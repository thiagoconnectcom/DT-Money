import { FormEvent, useState } from 'react'
import { useTransaction } from '../../hooks/useTransactionsContext'
import { Container, TransactionTypeContainer, RadioBox } from "./styles";

import Modal from 'react-modal'
import closeImg from "../../assets/close.svg"
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal ({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useTransaction();

    const [type, setType] = useState('deposit')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')

    async function handleCreateNewTransaction (event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type
        })

        setTitle('')
        setAmount(0)
        setCategory('')
        setType('')

        onRequestClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >

            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>

                <input placeholder="Titulo"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <input type="number" placeholder="Valor"
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => setType('deposit')}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entradas" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={() => setType('withdraw')}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saidas" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />

                <button type="submit"> Cadastrar </button>
            </Container>
        </Modal>
    )
}