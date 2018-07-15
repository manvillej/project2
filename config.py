import os

class Config(object):
    '''Check for environment variable'''
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'