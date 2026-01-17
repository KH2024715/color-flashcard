import React, { useState, useEffect } from "react";

const words = [
  { id: 1, word: "apple", meaning: "りんご", color: "#c1121f" },
  { id: 2, word: "grape", meaning: "ブドウ", color: "#480ca8" },
  { id: 3, word: "forest", meaning: "森", color: "#283618" }
];

const WordCard = ({ item }) => {
  const [isFront, setIsFront] = useState(true);

  // コンポーネントが表示された初期状態を強制的にword（表面）にする
  // ※より厳密にスワイプごとに戻したい場合は、親コンポーネントから制御する必要があります
  return (
    <div style={styles.page}>
      <div 
        style={{ ...styles.card, backgroundColor: item.color }} 
        onClick={() => setIsFront(!isFront)}
        className="card-touchable"
      >
        <div style={styles.text}>
          {isFront ? item.word : item.meaning}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // スクロールが終わった時に実行される関数
  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = window.innerWidth;
    const newIndex = Math.round(scrollLeft / width);
    
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div style={styles.safeArea}>
      {/* key に currentIndex を含めることで、
        スワイプしてページが変わるたびにカードコンポーネントを再生成（リセット）し、
        強制的に isFront = true に戻します。
      */}
      <div 
        style={styles.pagerView} 
        className="hide-scrollbar"
        onScroll={handleScroll}
      >
        {words.map((item, index) => (
          <WordCard 
            key={`${item.id}-${currentIndex === index}`} 
            item={item} 
          />
        ))}
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>
          {currentIndex + 1} / {words.length} — タップで反転
        </p>
      </div>

      <style>{`
        .card-touchable {
          transition: transform 0.1s, opacity 0.1s;
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .card-touchable:active {
          opacity: 0.7;
          transform: scale(0.96);
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}

const styles = {
  safeArea: {
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  pagerView: {
    flex: 1,
    display: "flex",
    overflowX: "auto",
    scrollSnapType: "x mandatory",
    WebkitOverflowScrolling: "touch",
  },
  page: {
    minWidth: "100vw",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
    scrollSnapAlign: "start",
  },
  card: {
    width: "100%",
    maxWidth: "450px",
    height: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "24px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
    color: "#ffffff",
  },
  text: {
    fontSize: "40px",
    fontWeight: "bold",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
  },
  footer: {
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTop: "1px solid #f0f0f0",
  },
  footerText: {
    color: "#888",
    fontSize: "14px",
    fontWeight: "bold",
  }
};