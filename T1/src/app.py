from flask import Flask, render_template, redirect, session, flash, request, url_for
import os 

app = Flask(__name__)


@app.route('/')
def init():
    session.clear()
    return render_template('homepage.html')


@app.route('/result', methods=['GET', 'POST'])
def result():

    return render_template('result.html')

if __name__ == '__main__':
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'

    #session.init_app(app)
    app.debug = True
    app.run(host='0.0.0.0', port='5000')

