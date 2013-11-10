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

AN iterator is an object that allows you to traverse a seq of data such as a list, dictionary, or tuple, for example. It also works with files.

Let’s see how iterators work.

numbers = [1,2,3,4,5]
for number in numbers:
    print(number)

While the for loop is controlling the iterations, the iterator itself is controlling the traversal of the list.

## Creating an iterator

numbers = [1,2,3]

to create an *explicit* iterator, we create a variable and call iter() on the list

it = iter(numbers)

we now have a `it` tied to the iterator of the `numbers` list.

to access the first element of the list, use the __next__() function:

print(it.__next__())

this is somewhat awkward, so we can use the next() function on the iterator itself

print(next(it))

Move through the list by repeatedly calling next(it). If you try to iterate past the end of the list, you’ll get a StopIteration exception. The implicit iterators, such as the for loop, are implemented to stop before the StopIteration exception is thrown.

Files are handled the same way as lists. In this case, the file object itself is an iterator:

fit = open(‘data.txt’, ‘r’)
print(next(fit))

This prints the first line of data.txt. Because a file object is an iterator, we can call next() on it.


## Iterators & Dictionaries

If you’re coming from another procedural programming language, you might iterate over a dictionary (or hash) as follows:

ages = {‘Mark’: 40, ‘Phil’: 33, ‘Bob’: 65}
for key in ages.keys():
    print(key, ages[key])	 

This will print the key (name) and value (age) for each pair in the dictionary.

So, how does this work, since dictionaries are more complex than lists? Let’s create an iterator over the dictionary and see:

it = iter(ages)
print(next(it))

This prints the first key. Note that subsequent calls to next() will not necessarily return the keys in the order in which they were defined. This is because dictionaries are inherently unsorted.

Having an iterator for a dictionary now allows you to simplify the previous for loop:

for key in ages:
    print(key, ages[key])


## Other Iterators

Iterators work with various Python datatypes. For example:

numbers = range(1,11)
it = iter(numbers)
print(next(it))

Same pattern as before with lists or dictionaries

What about more complicated data sources? Let’s look at the filesystem, for example:

import os

files = os.popen(‘ls *.py’)
fit = iter(files)
print(next(fit))

This will print the first filename, ending in .py, in the current directory. Again, this is the same pattern shown previously, and we can apply a for loop to the iterator:

import os

files = os.popen(‘ls *.py’)
for file in files:
    print(file)

To be even more terse, we can do this:

import os

for file in os.popen(‘ls *.py’):
    print(file)


Iterators also work with tuples. Let’s do something a bit more interesting than just a sequence of single values. We can define a square by its points’ cartesian coordinates:

square = ((10,8), (10,23), (25,23), (25,8))

We can use an iterator on square to retrieve these four coordinate values:

sit = iter(square)
print(next(sit))
print(next(sit))
print(next(sit))
print(next(sit))

You can probably guess by now that this can be done more easily with a for loop:

for point in square:
    print(point)


<section id="table-of-contents" class="toc">
<header>
<h3>Contents</h3>
</header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section>