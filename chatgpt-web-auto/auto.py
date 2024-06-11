from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# 配置 Selenium 连接到现有的 Chrome 浏览器
options = Options()
options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")

# 启动 WebDriver 并连接到现有的浏览器会话
driver = webdriver.Chrome(options=options)

try:
    # 增加等待时间
    wait = WebDriverWait(driver, 60)

    # 检查页面标题是否正确加载
    wait.until(EC.title_contains("ChatGPT"))
    print("Page title contains 'ChatGPT'")


    def send_message(message):
        # 等待 textarea 元素加载
        textarea = wait.until(
            EC.presence_of_element_located((By.ID, 'prompt-textarea'))
        )
        print("Textarea found")

        # 模拟输入消息
        textarea.send_keys(message)
        textarea.send_keys(Keys.RETURN)

        # 等待并查找发送按钮
        send_button = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//button[@data-testid='fruitjuice-send-button']"))
        )
        print("Send button found")
        send_button.click()

        # 等待新消息的出现
        new_message = wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "div[data-message-author-role='assistant']"))
        )
        print("New message received")

        # 获取最新的回复内容
        response_divs = driver.find_elements(By.CSS_SELECTOR, "div[data-message-author-role='assistant']")
        if response_divs:
            latest_response = response_divs[-1].text  # 获取最新的回复
            print("Latest response:", latest_response)
            return latest_response
        return ""


    # 模拟对话
    user_messages = ["Hello, how can I use ChatGPT?", "What are some uses of ChatGPT?", "How can I learn Python?"]
    for message in user_messages:
        print(f"User: {message}")
        response = send_message(message)
        print(f"ChatGPT: {response}")
        time.sleep(2)  # 等待一段时间再发送下一个消息

finally:
    # 注意：不要关闭浏览器，因为您可能仍然需要它
    pass
    # driver.quit()  # 如果您希望在操作完成后关闭浏览器，可以取消注释此行
