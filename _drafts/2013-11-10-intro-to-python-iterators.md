---
layout: post
title: Introduction to Python Iterators
categories: [articles]
tags: [article,IT,python,iterators,tutorial]
status: publish
type: post
published: true
meta: {}
---

An iterator is an object that allows you to traverse a sequence of data such as a list, dictionary, or tuple, for example. It also works with files.

Let’s see how iterators work.

{% highlight python %}
numbers = [1,2,3,4,5]
for number in numbers:
    print(number)
{% endhighlight %}

While the for loop is controlling the iterations, the iterator itself is controlling the traversal of the list.

## Creating an Iterator

{% highlight python %}
numbers = [1,2,3]
{% endhighlight %}

to create an *explicit* iterator, we create a variable and call `iter()` on the list

{% highlight python %}
it = iter(numbers)
{% endhighlight %}

We now have a `it` tied to the iterator of the `numbers` list.

Iterators follow a protocol based on two methods: `__iter__()` and `next()`. Internally, calling `X.__iter__()` is equivalent to calling `iter(X)`. To access the first element of the list, use the `next()` function:

{% highlight python %}
print(it.next())
{% endhighlight %}

*Note: If you are using Python 3, iterators will use `X.__next__()` instead of `X.next()`.*

This is somewhat awkward, so we can use the `next(X)` function on the iterator itself:

{% highlight python %}
print(next(it))
{% endhighlight %}

The `next(X)` function is not only simpler, it is version-neutral, remaing compatible between Python 2.x and 3.x. 

Move through the list by repeatedly calling next(it). If you try to iterate past the end of the list, you’ll get a StopIteration exception. The implicit iterators, such as the for loop, are implemented to stop before the StopIteration exception is thrown.

Files are handled the same way as lists. In this case, the file object itself is an iterator:

{% highlight python %}
fit = open('data.txt', 'r')
print(next(fit))
{% endhighlight %}

This prints the first line of data.txt. Because a file object is an iterator, we can call `next()` on it.

## Iterators & Dictionaries

If you’re coming from another procedural programming language, you might iterate over a dictionary (or hash) as follows:

{% highlight python %}
ages = {'Mark': 40, 'Phil': 30, 'Bob': 65}
for key in ages.keys():
    print(key, ages[key])	 
{% endhighlight %}

This will print the key (name) and value (age) for each pair in the dictionary.

So, how does this work, since dictionaries are more complex than lists? Let’s create an iterator over the dictionary and see:

{% highlight python %}
it = iter(ages)
print(next(it))
{% endhighlight %}

This prints the first key. Note that subsequent calls to `next()` will not necessarily return the keys in the order in which they were defined. This is because dictionaries are inherently unsorted.

Having an iterator for a dictionary now allows you to simplify the previous for loop:

{% highlight python %}
for key in ages:
    print(key, ages[key])
{% endhighlight %}

## Other Iterators

Iterators work with various Python datatypes. For example, with `range`:

{% highlight python %}
numbers = range(1,10)
it = iter(numbers)
print(next(it))
{% endhighlight %}

Same pattern as before with lists or dictionaries

What about more complicated data sources? Let’s look at the filesystem, for example:

{% highlight python %}
import os

files = os.popen('ls *.py')
fit = iter(files)
print(next(fit))
{% endhighlight %}

This will print the first filename, ending in .py, in the current directory. Again, this is the same pattern shown previously, and we can apply a for loop to the iterator:

{% highlight python %}
import os

files = os.popen('ls *.py')
for file in files:
    print(file)
{% endhighlight %}

To be even more terse, we can do this:

{% highlight python %}
import os

for file in os.popen('ls *.py'):
    print(file)
{% endhighlight %}

Iterators also work with tuples. Let's do something a bit more interesting than just a sequence of single values. We can define a square by its points' cartesian coordinates:

{% highlight python %}
square = ((10,8), (10,23), (25,23), (25,8))
{% endhighlight %}

We can use an iterator on square to retrieve these four coordinate values:

{% highlight python %}
sit = iter(square)
print(next(sit))
print(next(sit))
print(next(sit))
print(next(sit))
{% endhighlight %}

You can probably guess by now that this can be done more easily with a for loop:

{% highlight python %}
for point in square:
    print(point)
{% endhighlight %}

## Custom Iterators

Iterators are not limited to native Python datatypes. You can create iterators for your own custom classes as well. Simply follow the protocol explained earlier, implmenting `__iter__()` and `next()` (or `__next__()` in Python 3.x).

For example, we can create an iterator for a class that encapulates the [Fibonacci series](http://en.wikipedia.org/wiki/Fibonacci_number):

{% highlight python linenos %}
class Fib:
    '''iterator that yields numbers in the Fibonacci series'''

    def __init__(self, max):
        self.max = max

    def __iter__(self):
        self.a = 0
        self.b = 1
        return self

    def next(self):  # This will be __next__(self) in Python 3.x
        fib = self.a
        if fib > self.max:
            raise StopIteration
        self.a, self.b = self.b, self.a + self.b
        return fib
{% endhighlight %}

Now, we can print the first _n_ elements of the series:

{% highlight python %}
for fib in Fib(10):
    print(fib)
{% endhighlight %}

<section id="table-of-contents" class="toc">
<header>
<h3>Contents</h3>
</header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section>