Introduction to Python Decorators
=================================

In Python, functions are first-class objects. They can be passed as variables, and have attributes, 
just like any other object. They can also be _returned_ from other functions! 

```python
def outer_func():
    def inner_func():
        print('Inner funk!')
    return inner_func  # notice, no parens!
```

Note the absence of parentheses when returning `inner_func` above. Here we are not _calling_ the function, 
but rather returning a reference to the function. We can use this reference to invoke `inner_func` as follows:

```python
>>> inner = outer_func()
>>> inner()
Inner funk!
>>> 
```

The call to `outer_func` above simply returns a reference to `inner_func`, then we invoke `inner_func` by 
calling its reference as `inner()`.

# What are Decorators?

A decorator is simply a function that returns a function.

# Creating a Decorator

Define the "Identity Decorator":

```python
def identity(func):
    return func
```

Example:

```python
@identity
def foo(bar):
    pass
```

# Logging with Decorators

```python
def logger(func):
    def inner(*args, **kwargs):
        print("Arguments: {} {}".format(args, kwargs))
        return func(*args, **kwargs)
    return inner
```        

```python
@logger
def do_something(foo, bar):
  pass
```

Console output:

```
...
```

# Standard Library Decorators

## @classmethod

## @staticmethod

## @property


# Conclusion

