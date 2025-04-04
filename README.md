# Ecommerce APP
A Django-based demo frontend web application designed to showcase key features of an eCommerce system. It interacts with a backend eCommerce API to demonstrate core functionalities such as customer management, order processing, and user authentication using OAuth2. The app follows a modular structure to simulate integration with multiple service endpoints and highlight scalability potential in a real-world setup.

## Project Structure
![alt text](project_structure.png)

## Technologies used
* [Django](https://www.djangoproject.com/): A Python web framework
* [DRF](www.django-rest-framework.org/): A powerful and flexible toolkit for building Web APIs

## Prerequisites
* [Python 3.x](https://www.python.org/downloads/)
* [Pip](https://pip.pypa.io/en/stable/installation/)
* [PostgreSQL](https://www.postgresql.org/download/)or any compatible database
* [Google Account](https://console.cloud.google.com/getting-started)  
* [Africa Talk SMS gateway](https://account.africastalking.com/apps/sandbox) 

## Setup Instructions
1. Clone the Repository:                                                                                                                                                          
    ```bash
        $ git clone https://github.com/kevi-t/ecommerce_app 
    ```
2. Set Up Virtual Environment:                                                                                                                                                                                  
    ```bash
        $ python -m venv venv 
    ```
3. To activate the environment: source venv/bin/activate & On Windows use                                                                                                                                        
    ```bash
        $ venv\Scripts\activate
    ```
4. Install Dependencies:                                                                                                                                                                             
    ```bash
        $ pip install -r requirements.txt
    ```
5. Configure local settings add your secret keys for the Google account,Django secret and Africa Talk Sms gate way
6. Configure Environment Variables: Create a .env file in the root directory and add necessary environment variables; Google,AfricaTalking SECRET_KEY,DATABASE_URL
8. Run Migrations:                                                                                                                                                                                              
    ```bash
        $ python manage.py migrate
    ```
9. Run the Development Server:                                                                                                                                                                            
    ```bash
        $ python manage.py runserver
    ```

### Key Features in This `README.md`:
1. **Project Structure**: Clearly outlined, showing how the project is divided into modules.
2. **Setup Instructions**: Step-by-step guide to get the API up and running locally.
3. **API Endpoints**: Sample endpoints for the main modules (customer, order).

### Web Application Screenshots
Landing page
![alt text](image.png)
Login Page
![alt text](image-1.png)
Signup Page
![alt text](image-2.png)
### Process flow Diagram
![ecommerce_app process flow diagram](https://github.com/user-attachments/assets/c11cec5c-5576-46d5-b984-7acebf55fb81)


### Deployment
* [Vercel](https://vercel.com/): Deployment of my Django App
* [Railway](https://railway.com/): Deployment of my Postgre database service
  
### Resources
* [Django docs](https://docs.djangoproject.com/): Django documentation 
