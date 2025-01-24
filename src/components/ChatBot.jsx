import React, { useState, useEffect } from "react";
import "../assets/css/chatBot.css";
import mhbLogo from "../assets/images/chatbot_logo.png";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Predefined responses for specific questions
  const predefinedResponses = {
    "how to buy":
      "To buy a product, browse through our categories, select the item, add it to your cart, and proceed to checkout.",
    "what is your return policy":
      "We offer a 30-day return policy. Items must be unused and in original packaging.",
    "do you offer free shipping":
      "Yes, we offer free shipping on orders over [specify minimum order amount].",
    "what payment methods do you accept":
      "We accept debit cards from Bank Alfalah Debit Card, Easypaisa, Jazzcash, and Meezan Bank for Pakistani currency.",
    "how can I track my order":
      "You can track your order using the tracking link sent to your email after shipping.",
    "how to contact customer support":
      "You can reach us at cs@mhbstore.com or call us at +92300-4233378.",
    "what kind of products do you sell here":
      "We offer a wide range of high-quality products to meet everyday needs. Our selection is curated to focus on quality and customer value.",
    "can you tell me more about the quality of your items":
      "Quality is our top priority. All products go through careful checks to ensure durability and functionality.",
    "are your products eco-friendly or sustainably made":
      "Yes, we strive to offer eco-friendly options and source from suppliers with sustainable practices whenever possible.",
    "do you have any new arrivals or unique items in stock":
      "Absolutely! We frequently add new products. Check out our New Arrivals section for the latest items.",
    "how long does shipping usually take":
      "Shipping typically takes 3–7 business days, depending on your location.",
    "is there an option for express or next-day delivery":
      "We do offer express shipping for an additional fee. Choose this option at checkout for faster delivery.",
    "do you ship internationally":
      "Yes, we offer international shipping! Please check our shipping policy page to see all available countries.",
    "whats your return policy if I’m not satisfied with my purchase":
      "We accept returns within 30 days of delivery if you’re not fully satisfied. The item must be in original condition.",
    "how do I start a return or exchange process":
      "Simply contact our customer support team at cs@mhbstore.com with your order details, and we’ll guide you through the process.",
    "are there any fees for returning an item":
      "Return shipping fees may apply depending on the reason for the return. Contact us to learn more.",
    "how long does it take to get a refund after I return something":
      "Once we receive and process your return, refunds typically take 5–7 business days to appear on your account.",
    "what payment options are available at checkout":
      "We accept major credit cards, Jazz cash, Easypaisa, Meezan Bank, and Bank Alfalah, and other secure payment options for your convenience.",
    "are there any current promotions or discounts I can use":
      "Yes, we often have seasonal promotions and discounts. Check our website banner or subscribe to our newsletter for updates.",
    "can I apply more than one discount code to my order":
      "At this time, only one discount code can be applied per order.",
    "do you offer any special discounts for first-time buyers":
      "Yes, first-time buyers can enjoy a [specify discount amount] discount on their initial purchase. Use code WELCOME at checkout!",
    "how can I get in touch with customer support if I need help":
      "You can reach our support team through email at cs@mhbstore.com, or call us at +123-456-7890.",
    "what are your customer service hours":
      "Our customer service is available Monday through Friday, from 9 AM to 12 PM.",
    "do you offer live chat support, or is it only email":
      "Yes, we offer live chat support during our customer service hours for immediate assistance.",
    "can someone help me pick the best product for my needs":
      "Definitely! Our support team can help recommend products based on your specific needs. Reach us at cs@mhbstore.com.",
    "how do I create an account on your website":
      "Simply click Sign Up at the top of our homepage and fill in your details to create an account.",
    "how can I view my order history":
      "Log into your account, go to the My Orders section, and you’ll be able to see your order history.",
    "what are the benefits of having an account with MHB Store":
      "With an account, you can easily track orders, save favorite products, and get access to special offers.",
    "how can I change my account password":
      "Go to your account settings, select Change Password, and follow the steps provided.",
    "how secure is my payment information on your website":
      "We use encryption and secure payment gateways to ensure that all your payment details are protected.",
    "what personal information do you collect, and how do you use it":
      "We only collect necessary information to process orders and improve your experience. Read our Privacy Policy for full details.",
    "can I review your privacy policy":
      "Yes, our Privacy Policy is available on our website at the bottom of every page.",
  };

  useEffect(() => {
    if (isOpen) {
      const welcomeMessage = {
        sender: "bot",
        text: "Welcome to MHB Store! How can I assist you today?",
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  // Display the selected answer when a question is clicked
  const handleQuestionClick = (question) => {
    // Normalize the question by trimming spaces, converting to lowercase, and removing special characters
    const normalizedQuestion = question
      .trim()
      .toLowerCase()
      .replace(/[^\w\s]/g, ""); // Removes non-alphanumeric characters (punctuation)

    // Find the response using a case-insensitive and cleaner matching
    const response = Object.keys(predefinedResponses).find((key) =>
      key.toLowerCase().trim().replace(/[^\w\s]/g, "") === normalizedQuestion
    );

    // Get the predefined response for the normalized question
    const answer = response ? predefinedResponses[response] : "Sorry, I don't have an answer for that question.";

    // Add the question and answer to the message list
    const newMessages = [
      { sender: "user", text: question },
      {
        sender: "bot",
        text: answer,
      },
    ];

    setMessages(newMessages);
  };

  const toggleChatBot = () => setIsOpen(!isOpen);

  return (
    <div className="chatbot-wrapper">
      <div className="chatbot-logo-container" onClick={toggleChatBot}>
        <img src={mhbLogo} alt="MHB Store Logo" className="chatbot-logo" />
      </div>
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">Chat Support</div>

          {/* List of Predefined Questions */}
          <div className="mhb-question-container">
            <div className="chatbot-question-list">
              {Object.keys(predefinedResponses).map((question, index) => (
                <div
                  key={index}
                  className="chatbot-question"
                  onClick={() => handleQuestionClick(question)}
                >
                  {question}
                </div>
              ))}
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-social-links">
            <Link
              to="https://wa.me/923004233378"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={20} className="whatsapp-icon" />
            </Link>

            <Link
              to="https://www.facebook.com/profile.php?id=61566316956196"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={20} className="facebook-icon" />
            </Link>
            <Link
              to="https://instagram.com/MHBStore"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={20} className="instagram-icon" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
