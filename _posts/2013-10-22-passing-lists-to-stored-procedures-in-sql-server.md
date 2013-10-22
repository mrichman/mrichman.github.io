---
layout: post
title: Passing Lists as Parameters to Stored Procedures in SQL Server
categories: [articles]
tags: [sql,sqlserver]
status: publish
type: post
published: true
meta: {}
---

There is no good way to do this in SQL Server. Someday they will have an [array datatype like PostgreSQL](http://www.postgresql.org/docs/9.1/static/arrays.html).  

In SQL Server 2005 and higher, this can be done using XML, but I don't particularly see the need for the overhead. Use the function below to split a delimited string and select from the returned table. Its also very helpful for reporting. 

{% highlight sql linenos %}
CREATE FUNCTION [dbo].[SplitList] (@list VARCHAR(MAX), @separator VARCHAR(MAX) = ';')
RETURNS @table TABLE (Value VARCHAR(MAX))
AS BEGIN
   DECLARE @position INT, @previous INT
   SET @list = @list + @separator
   SET @previous = 1
   SET @position = CHARINDEX(@separator, @list)
   WHILE @position > 0 BEGIN
      IF @position - @previous > 0
         INSERT INTO @table VALUES (SUBSTRING(@list, @previous, @position - @previous))
      IF @position >= LEN(@list) BREAK
      SET @previous = @position + 1
      SET @position = CHARINDEX(@separator, @list, @previous)
   END
   RETURN
END
{% endhighlight %}

To use this function, simply pass your list, and specify the desired delimiter:

{% highlight sql %}SELECT * FROM dbo.SplitList('1,2,3,4,5', ';'){% endhighlight %}

Why use this technique? Performance. You make one call to the database. For the detractors of this design pattern, I ask: why would it be a bad idea to pass a collection to a stored procedure? Is it a bad idea in .NET to pass a collection as an argument to a method?