import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // モーダルを使用するコンポーネントでアプリケーションのルートを設定

const ItemDetail = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>モーダルを表示</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="モーダル"
      >
        <button onClick={() => setModalIsOpen(false)}>モーダルを閉じる</button>
        <p>モーダルコンテンツです。ここに好きな内容を入れてください。</p>
      </Modal>
    </div>
  );
}

export default ItemDetail;