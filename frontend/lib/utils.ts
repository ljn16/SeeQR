import ms from 'ms';
import type { Feedback } from '../types';

import { ipcRenderer } from 'electron';
import { render } from 'enzyme';

/**
 * Execute function at most once. Doesn't passthrough functions returned value
 */
export const once = (func: Function) => {
  let hasRun = false;
  return () => {
    if (!hasRun) func();
    hasRun = true;
  };
};

/**
 * Get reading time for string in ms. Calculated based on number of words
 * Minimum reading time is 3s
 */
export const readingTime = (str: string) => {
  const averageWordsPerMinute = 200;
  const totalWords = str.split(' ').length;
  const readTime = (totalWords * ms('1m')) / averageWordsPerMinute;
  return Math.max(ms('3s'), readTime);
};

/**
 * Emit feedback event that can be listened to by ipcRenderer.
 * Used to send messages to FeedbackModal.tsx
 */
// REVIEW: I need to revisit this because it definitely doesn't work
export const sendFeedback = (feedback: Feedback) => {
  // TODO: Old code
  // const rendererId = window
  //   .require('electron')
  //   .remote.getCurrentWebContents().id;
  // ipcRenderer.sendTo(rendererId, 'feedback', feedback);

  const getRendererId = async () => {
    const currentWindow = await ipcRenderer.invoke('getCurrentWindow');
    return currentWindow.webContents.id;
  };

  getRendererId().then((rendererId) => {
    ipcRenderer.sendTo(rendererId, 'feedback', feedback);
  });
};
