import { useState } from 'react';

import FeedbackOptions from './components/FeedbackOptions';
import Notification from './components/Notification';
import Statistics from './components/Statistics';
import Title from './components/Title';
import './index.css';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleFeedbacksClick = event => {
    switch (event.target.name) {
      case 'good':
        return setGood(state => state + 1);
      case 'neutral':
        return setNeutral(state => state + 1);
      case 'bad':
        return setBad(state => state + 1);

      // no default
    }
  };

  const countTotalFeedback = () => {
    const total = Object.values([good, neutral, bad]).reduce(
      (acc, item) => acc + item,
      0,
    );

    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const percentage = total ? Math.round((good / total) * 100) : 0;

    return percentage;
  };

  const options = Object.keys({ good, neutral, bad });

  return (
    <section>
      <Title text="Please leave feedback" />
      <FeedbackOptions
        options={options}
        onLeaveFeedback={handleFeedbacksClick}
      />
      <Title text="Statistics" />
      {countTotalFeedback() !== 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={countTotalFeedback()}
          positiveFeedback={countPositiveFeedbackPercentage()}
        ></Statistics>
      ) : (
        <Notification message="No feedback given" />
      )}
    </section>
  );
}
