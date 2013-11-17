---
layout: post
title: Introduction to Python Decorators
categories: [articles]
tags: [article,IT,python,decorators,tutorial]
status: publish
type: post
published: true
meta: {}
---
# What are Decorators?

In Python, functions are first-class objects. They can be passed as variables, and have attributes, 
just like any other object. They can also be _returned_ from other functions! 

{% highlight python linenos %}
def outer_func():
    def inner_func():
        print('Inner funk!')
    return inner_func  # notice, no parens!
{% endhighlight %}

Note the absence of parentheses when returning `inner_func` above. Here we are not _calling_ the function, 
but rather returning a reference to the function. We can use this reference to invoke `inner_func` as follows:

{% highlight text %}
>>> inner = outer_func()
>>> inner()
Inner funk!
>>> 
{% endhighlight %}

The call to `outer_func` above simply returns a reference to `inner_func`, then we invoke `inner_func` by 
calling its reference as `inner()` (with parentheses this time).

**A decorator is simply a function that returns a function.**

# Creating a Decorator

Let's start with the simplest decorator possible - one that does virtually nothing. We will call this construct the "Identity Decorator":

{% highlight python linenos %}
def identity(func):
    def _identity(*args, **kwargs):
        return func(*args, **kwargs)
    return _identity
{% endhighlight %}

This decorator simply returns what ever function and argument(s) was passed to it, without modification. To use a decorator, prefix the method of your choice with the `@` symbol followed by the decorator function name:

{% highlight python linenos %}
@identity
def foo(bar):
    pass
{% endhighlight %}

The decorator `identity` will take the function `foo` as its parameter, and return it unmodified. Now let's try something concrete.

# Say Hello

We can create a decorator to print "Hello" to the console whenever the function it decorates is called.

{% highlight python linenos %}
def hello(func):
    def inner(*args, **kwargs):
        print("Hello")
        return func(*args, **kwargs)
    return inner
{% endhighlight %}

Here, the `hello` function is the decorator. Within this function is a *nested function* called `inner` which prints "Hello" to the console. It then calls the function passed into `hello`, along with its arguments, if any.

{% highlight python linenos %}
@hello
def foo():
    print("Sweet Charlie")
{% endhighlight %}

I chose `inner` for the nested function arbitrarily. You can use any name you like. Now, when we call `foo` we will get the following output:

{% highlight text %}
In [1]: def hello(func):
   ...:     def inner(*args, **kwargs):
   ...:         print("Hello")
   ...:         return func(*args, **kwargs)
   ...:     return inner
   ...: @hello
   ...: def foo():
   ...:     print("Sweet Charlie")
   ...: foo()
   ...: 
Hello
Sweet Charlie
{% endhighlight %}

Now, for any function decorated with `@hello`, The string "Hello" will be printed to the console. We can build a more complex - and useful - example on top of this decorator.

# Use Case: Logging with Decorators

Let's create a *logging* decorator, which will print the name of the called function, along with any parameters passed to it:

{% highlight python linenos %}
def logger(func):
    def inner(*args, **kwargs):
	    res = func(*args, **kwargs)
	    print func.__name__, args, kwargs
	    return res
    return inner      

@logger
def do_something(foo, bar):
  pass
{% endhighlight %}

Console output:

{% highlight text %}
>>> do_something(1,2)
do_something (1, 2) {}
{% endhighlight %}

Our `logger` function, upon a call to `do_something(1,2)` simply printed out the function name `do_something` and its arguments as the tuple `(1,2)`. No keyword (named) arguments were supplied, so the empty dictionary `{}` was printed.

Replacing the positional arguments with keyword arguments to `do_something` emits the following log statement:

{% highlight text %}
>>> do_something(foo=1,bar=2)
do_something () {'foo': 1, 'bar': 2}
{% endhighlight %}

Now, anytime you want to do a little *poor man's debugging* you can use the `@log` decorator without having to modify any of your existing code. Consider a more robust version of this logger using the built in [`logging`](http://docs.python.org/2/howto/logging.html) module.

# Use Case: Timing a Function

We can implement another handy tool to measure the performance of a function.

{% highlight python linenos %}
def timeit(func):
    """A decorator that prints the time a function takes to execute."""
    import time
    def wrapper(*args, **kwargs):
        t = time.time()
        res = func(*args, **kwargs)
        print func.__name__, time.time() - t
        return res
    return wrapper
{% endhighlight %}

Let's simulate a slow-running function:

{% highlight python linenos %}
import time

@timeit
def slow():
    time.sleep(5)
{% endhighlight %}

When we call `slow` we introduce an artificial delay of 5 seconds using `sleep(5)`:

{% highlight python %}
>>> slow()
slow 5.00087594986
>>> slow()
slow 5.0011920929
>>> slow()
slow 5.00118708611
{% endhighlight %}

The operating system's high resolution timer shows that "5 seconds" can vary just a bit!

# Use Case: Stacking Multiple Decorators

Multiple decorators can be applied to any function. Simply stack them like this:

{% highlight python linenos %}
@decorator3
@decorator2
@decorator1
def foo():
    pass
{% endhighlight %}

It is important to note that Python will apply the decorators from *innermost* to *outermost*. In our example above, `decorator1` is executed first.

# Standard Library Decorators

The Python standard library has a number of built-in decorators, available anywhere.

## @classmethod

Class methods are bound to a class, but **not** to a specific *instance* of a class. For example:

{% highlight python linenos %}
class Circle:
	diameter = 12

	@classmethod
	def get_diameter(cls):
        return cls.diameter
{% endhighlight %}

In the `Circle` class above, notice the `diameter` variable is a *class* member. That is, it belongs to the class, not any particular instance. There is also no `self.` prepended to `diameter`.

The `classmethod` decorator applies the same structure to a function. The `get_diameter` function is a member of the `Circle` class. Notice the first parameter is called `cls`. This is an *implicit* reference to the `Circle` class.

We can call `get_diameter` as follows:

{% highlight text %}
>>> Circle.get_diameter()
12
{% endhighlight %}

Notice we called `get_diameter` *directly* on the `Circle` class, and not on an instance.

We can create an *instance* of `Circle` and call `get_diameter`, producing the same result:

{% highlight text %}
>>> circle = Circle()
>>> circle.get_diameter()
12
{% endhighlight %}

Using `classmethod` also has the benefit of working with inheritance. All subclasses will be able to access the function decorated with `classmethod`.

Here's an example of a class method being invoked by a subclass:

{% highlight python linenos %}
class Parent:
    member = 'x'

    @classmethod
    def foo(cls):
        print(cls.member)

class Child(Parent):
    pass
{% endhighlight %}

We can call `foo` directly from the `Child` class:

{% highlight text %}
>>> Child.foo()
x
{% endhighlight %}

## @staticmethod

Static methods in Python behave a bit differently than class methods, and are more similar to those found in Java or C++, for example. Unlike class methods. static methods have no knowledge of the class in which they are defined.

{% highlight python linenos %}
class Foo:
    @staticmethod
    def bar():
        pass
{% endhighlight %}

Notice that `bar` has no `cls` or `self` arguments. Call static methods similarly to class methods:

`>>> Foo.bar()`

## @property

The `property` decorator can be used to control access to a variable. Applying this decorator gives a function `getter`, `setter`, and `deleter` attributes. You can use just the `property` decorator on its own:

{% highlight python linenos %}
class Foo:
    def __init(self):
        self._bar = None

    @property
    def bar(self):
        return self._bar
{% endhighlight %}

This makes the `bar` function act as if it were a property:

{% highlight text %}
>>> f = Foo()
>>> f.bar = 'x'
>>> f.bar
'x'
{% endhighlight %}

or you can enhance the `setter` and `deleter` behavior:

{% highlight python linenos %}
class Foo:
    def __init(self):
        self._bar = None

    @property
    def bar(self):
        return self._bar

    @bar.setter
    def bar(self, value):
        self._bar = value

    @bar.deleter
    def bar(self):
        del self._bar
{% endhighlight %}

Notice the syntax of `setter` and `deleter` - the decorator is prefixed with `bar.`. This indicates that the decorator applies to the property `bar`. Decorated functions can also have decorators!

# Conclusion

We've seen how decorators can be used to augment behavior with minimal code changes. This approach has limitless uses. Please leave a comment below, and let me know how **you** use decorators!


<section id="table-of-contents" class="toc">
<header>
<h3>Contents</h3>
</header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section>
