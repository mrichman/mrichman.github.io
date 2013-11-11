Introduction to Python Generators
=================================

This article is part two of my series on iterators and generators. If you haven't read [part one](http://www.markrichman.com/intro-to-python-iterators/), or if you aren't experienced with iterators in Python, then please [start here](http://www.markrichman.com/intro-to-python-iterators/).

# What are Generators?

Generators (introduced in [PEP 255](http://www.python.org/dev/peps/pep-0255/)) extend the concept of iterators. In essence, they are iterators with "intelligence". A generator function is effectively the `next()` iterator method, applied to get the next value in a sequence. Unlike regular functions, generators use the `yield` keyword instead of `return` and maintain state across multiple calls.

Generator functions also allow you to pause execution, saving state until you resume execution. Let's look at a simple example:

    >>> def gen():
    ...     yield 1
    ...     yield 2
    ...     yield 3
    ... 
    >>> for i in gen(): print(i)
    ... 
    1
    2
    3

If you instantiate the generator function, you can see that a generator object is returned:

    >>> g = gen()
    >>> g
    <generator object gen at 0x10d345050>
    >>> 

Because generators **implement** the iterator interface, you can repeatedly call `next()` on `g` to fetch each value emitted by the successive `yield` calls:

    >>> g.next()
    1
    >>> g.next()
    2
    >>> g.next()
    3
    >>> g.next()
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    StopIteration

It is important to note that instantiating a generator **does not** execute the body of the function. Only upon a call to `next()` (either explicit or implicit) will the generator execute. Each execution returns the next `yield` and freezes.

Let's rewrite the Fibonacci series function from the previous article as a generator:

    >>> def fib():
    ...     x = 0
    ...     y = 1
    ...     while 1:
    ...         x, y = y, x + y
    ...         yield x
    ... 
    >>> g = fib()
    >>> g.next()
    1
    >>> g.next()
    1
    >>> g.next()
    2
    >>> g.next()
    3
    >>> g.next()
    5
    >>> g.next()
    8
    >>> g.next()
    13
    >>> 

You can see that this generator will work for an any size list:

    >>> g = fib()
    >>> for i in range(8): print g.next()
    ... 
    1
    1
    2
    3
    5
    8
    13
    21
    >>> 

# Use the Schwartz

[Phil](http://www.linkedin.com/pub/philip-schwartz/a/126/a18) challenged me with a generator problem he uses on technical interviews. Here's the problem:

> You have a stream of values that need to be read from a text file. Each line of text contains an integer. The stream is too large to fit in memory all at once. Write a generator to process the stream of values and calculate their sum. Do not use the form of `with open(filename) as f:` in your solution.

Let's assume the file `data.txt` list each integer from 1 through 99,999 as such:

    1
    2
    3
    4
    5
    ...
    99999

We can define a generator function that accepts an arbitrary filename, and `yield`s each line individually:

    In [1]: def values(filename):
       ...:     f = open(filename, 'r')
       ...:     for line in f:
       ...:         yield int(line)
       ...:         

Next, we accumulate the sum from the file `data.txt`:

    In [2]: sum = 0
    
    In [3]: for x in values('data.txt'):
       ...:     sum += x
       ...:     
    
And finally, print the sum:

    In [4]: print(sum)
    4999950000
    
The power of generators here is that a constant amount of memory is utilized, no matter how large the data set.

Consider a more complex example, where we want to read a binary file of arbitrary size in chunks, and operate on those chunks:

    def read_in_chunks(file_object, chunk_size=2048):
        """Generator to read a file one chunk at a time.
        Default chunk size: 2KB"""
        while 1:
            data = file_object.read(chunk_size, 'rb')
            if not data:
                break
            yield data

The implementation of `process_data()` is completely arbitrary - it could send bytes over a socket connection, for example. Now we can call `process_data()` on each of these chunks. 

    f = open('alottadata.dat')
    for chunk in read_in_chunks(f):
        process_data(chunk)
        
# Generator Expressions

If you're familiar with [list comprehensions](http://docs.python.org/2/tutorial/datastructures.html#list-comprehensions), then you already know how to use generator expressions! If not, please take a few minutes to [read up](http://docs.python.org/2/tutorial/datastructures.html#list-comprehensions). A generator expression represents a sequence of results without turning it into a concrete list.

Here is a familiar list comprehension:

    In [1]: [x for x in (1, 2, 3)]
    Out[1]: [1, 2, 3]
    
We can rewrite this as a generator expression with one simple syntactic change:

    In [1]: (x for x in (1, 2, 3))
    Out[1]: <generator object <genexpr> at 0x10351bf50>
    
Now, we can iterate as expected:

    In [2]: g.next()
    Out[2]: 1
    
    In [3]: g.next()
    Out[3]: 2
    
    In [4]: g.next()
    Out[4]: 3
    
    In [5]: g.next()
    ---------------------------------------------------------------------------
    StopIteration                             Traceback (most recent call last)
    <ipython-input-16-d7e53364a9a7> in <module>()
    ----> 1 g.next()
    
    StopIteration: 

Generator expressions can be use in place of generator functions. For example:

    sum(x**2 for x in range(1, 11))

This calls the built-in function `sum()` with as its argument a generator expression that yields the squares of the numbers from 1 through 10 inclusive. The `sum()` function adds up the values in its argument resulting in an answer of 385. The advantage over `sum([x**2 for x in range(1, 11)])` should be obvious. The latter creates a list containing all the squares, which is then iterated over **once** before it is thrown away. For large collections, these savings in memory usage are an important consideration.

# Conclusion

You can see how generators can be used for _lazy evaluation_ and for calculating large sets of results. Using generators can minimize memory allocation, and allows the caller to get started processing the first few values immediately. In short, a generator looks like a function but behaves like an iterator.

**Coming soon: Introduction to Decorators!**

