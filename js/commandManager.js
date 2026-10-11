import { UIManager } from "./uiManager.js";

/**
 * @description Manages the application's undo/redo history using command objects.
 * This is more memory-efficient than storing full state snapshots.
 */
export const CommandManager = {
  undoStack: [],
  redoStack: [],
  // Commands load scenes asynchronously; chaining them keeps rapid clicks
  // from finishing out of order and leaving the canvas out of sync with state.
  queue: Promise.resolve(),

  /** Runs an async step after any in-flight command has finished. */
  enqueue(step) {
    this.queue = this.queue
      .then(step)
      .catch((err) => console.error("Command failed:", err))
      .finally(() => UIManager.syncUI());
    return this.queue;
  },

  /** Executes a command, adds it to the undo stack, and clears the redo stack. */
  execute(command) {
    this.undoStack.push(command);
    if (this.undoStack.length > 20) this.undoStack.shift();
    this.redoStack = [];
    UIManager.syncUI();
    return this.enqueue(() => command.execute());
  },

  /** Undoes the most recent command. */
  undo() {
    if (this.undoStack.length === 0) return;
    const command = this.undoStack.pop();
    this.redoStack.push(command);
    UIManager.syncUI();
    UIManager.announce("Action undone.");
    return this.enqueue(() => command.undo());
  },

  /** Redoes the most recently undone command. */
  redo() {
    if (this.redoStack.length === 0) return;
    const command = this.redoStack.pop();
    this.undoStack.push(command);
    UIManager.syncUI();
    UIManager.announce("Action redone.");
    return this.enqueue(() => command.execute());
  },
};
