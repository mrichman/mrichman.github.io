Introduction to Python Decorators
=================================

# What are decorators?

Function that returns a function

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

