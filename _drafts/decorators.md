Introduction to Python Decorators
=================================

# What are decorators?

Function that returns a function

# Creating a Decorator

Define the "Identity Decorator":

    def identity(func):
        return func

Example:

    @identity
    def foo(bar):
        pass

# Logging with Decorators

    def logger(func):
        def inner(*args, **kwargs):
            print("Arguments: {} {}".format(args, kwargs))
            return func(*args, **kwargs)
        return inner
        
