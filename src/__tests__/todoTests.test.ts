import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver,
} from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

// import { WebDriver } from "selenium-webdriver";

class TodoPage {
  driver: WebDriver;
  url: string = "https://devmountain.github.io/qa_todos/";
  todoInput: By = By.className('new-todo');
  todos: By =  By.css('li.todo');
  todoLabel: By = By.xpath('//label[text()="Test To-Do"]');
  todoComplete: By = By.xpath('(//input[@class="toggle"])[1]');
  clearCompletedButton: By = By.className('clear-completed');
  todoCount: By = By.className('todo-count');
  star: By = By.className('star');
  constructor (driver: WebDriver) {
    this.driver = driver;
  }

}

const tD = new TodoPage(driver);

describe("the todo app", () => {
  // beforeEach(async () => {
  //   await driver.get(tD.url);
  // });
  // afterAll(async () => {
  //   await driver.quit();
  // });
  it("can add a todo", async () => {
    await driver.get(tD.url);
    await driver.wait(until.elementLocated(tD.todoInput));
    await driver.findElement(tD.todoInput).sendKeys('Test\n');
    // await driver.sleep(1000);
    // expect(tD.todoInput).toContain("Test");
  });
  it("can remove a todo", async () => {
    // let myTodos = await driver.findElements(todos);
    let theTodos = await driver.findElement(tD.todos);
    await theTodos.findElement(tD.todoComplete).click();
    await theTodos.findElement(tD.todoComplete).click();
  
  });
  it("can mark a todo with a star", async () => {
    let done = await driver.findElement(tD.todos);
    await done.findElement(tD.star).click();
  });
  it("has the right number of todos listed", async () => {
    await driver.wait(until.elementLocated(tD.todoInput));
    let startCaunt = await (await driver.findElements(tD.todos)).length;
  
    await driver.findElement(tD.todoInput).sendKeys('Test 1\n');
    await driver.findElement(tD.todoInput).sendKeys('Test 2\n');
    await driver.findElement(tD.todoInput).sendKeys('Test 3\n');

    let endCount = await (await driver.findElements(tD.todos)).length;

    let message = await (await driver.findElement(tD.todoCount)).getText();

    await driver.quit();

    expect(endCount - startCaunt).toBe(3);
    expect(message).toBe(`${endCount} items left`);

  });
});
