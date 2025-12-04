# 伽罗华域学习





## 以$GF(2^3)$为例

本原多项式是$p(x) = x^3 + x + 1$，所以$α$是这个方程的根，有$α^3=α+1$，因此



|   0   |                             000                              |
| :---: | :----------------------------------------------------------: |
|   1   |                             001                              |
|  $α$  |                             010                              |
| $α^2$ |                             100                              |
| $α^3$ |                $\alpha^3 = \alpha + 1 = 011$                 |
| $α^4$ | $\alpha^4 = \alpha \cdot \alpha^3 = \alpha(\alpha+1) = \alpha^2 + \alpha = 110$ |
| $α^5$ | $\alpha^5 = \alpha \cdot \alpha^4 = \alpha^3 + \alpha^2 = (\alpha+1) + \alpha^2 = \alpha^2 + \alpha + 1 = 111$ |
| $α^6$ | $\alpha^6 = \alpha \cdot \alpha^5 = \alpha^3 + \alpha^2 + \alpha = (\alpha+1) + \alpha^2 + \alpha = \alpha^2 + 1 = 101$ |
| $α^7$ |                        $\alpha^7 = 1$                        |

有生成多项式是$$g(x) = (x + \alpha)(x + \alpha^2)(x + \alpha^3)(x + \alpha^4)=$$g(x) = x^4 + \alpha^3 x^3 + x^2 + \alpha x + \alpha^3$$，其生成码字

系统码的定义是：信息位在码字的高位，监督位（校验位）在低位。公式为：$$c(x) = x^{n-k} m(x) + \underbrace{(x^{n-k} m(x) \bmod g(x))}_{\text{余数}}$$，$n=7, k=3$，所以 $n-k=4$。我们需要把信息多项式左移 4 位，然后除以 $g(x)$ 求余数。

#### 1. 计算 $c_0(x)$，对应 $m_0(x) = 1$



左移 4 位：$x^4 \cdot 1 = x^4$

做除法求余数：$x^4 \div g(x)$

因为 $g(x) = x^4 + \alpha^3 x^3 + x^2 + \alpha x + \alpha^3$，

显然 $x^4 = 1 \cdot g(x) + (\alpha^3 x^3 + x^2 + \alpha x + \alpha^3)$。

(注：在二进制域，加法等于减法，移项即可)

所以余数就是 $g(x)$ 去掉最高项 $x^4$ 后的部分：$\alpha^3 x^3 + x^2 + \alpha x + \alpha^3$。

构造码字：$$c_0(x) = x^4 + (\alpha^3 x^3 + x^2 + \alpha x + \alpha^3)$$

#### 2. 计算 $c_1(x)$，对应 $m_1(x) = x$

- 左移 4 位：$x^4 \cdot x = x^5$

- 做除法求余数：$x^5 \div g(x)$

  这就相当于把上一步 $c_0(x)$ 的结果乘以 $x$，然后再次对 $g(x)$ 取模。

  已知 $x^4 \equiv \alpha^3 x^3 + x^2 + \alpha x + \alpha^3 \pmod{g(x)}$

  两边同乘 $x$:$x^5 \equiv \alpha^3 x^4 + x^3 + \alpha x^2 + \alpha^3 x$

  把右边的 $x^4$ 再次替换掉：

  $= \alpha^3 (\alpha^3 x^3 + x^2 + \alpha x + \alpha^3) + x^3 + \alpha x^2 + \alpha^3 x$

  $= (\alpha^6 x^3 + \alpha^3 x^2 + \alpha^4 x + \alpha^6) + x^3 + \alpha x^2 + \alpha^3 x$

  合并同类项（系数相加即异或）：

  $x^3$ 项: $\alpha^6 + 1 = 101 \oplus 001 = 100 = \alpha^2$

  $x^2$ 项: $\alpha^3 + \alpha = 011 \oplus 010 = 001 = 1$

  $x^1$ 项: $\alpha^4 + \alpha^3 = 110 \oplus 011 = 101 = \alpha^6$

  常数项: $\alpha^6$

  所以余数是 $\alpha^2 x^3 + x^2 + \alpha^6 x + \alpha^6$。

- 构造码字：

  信息位 $x^5$ 加上余数：$$c_1(x) = x^5 + \alpha^2 x^3 + x^2 + \alpha^6 x + \alpha^6$$

#### 3. 计算 $c_2(x)$，对应 $m_2(x) = x^2$



- 左移 4 位：$x^4 \cdot x^2 = x^6$
- 原理同上，将 $c_1(x)$ 的计算结果再乘以 $x$

已知 $x^5 \equiv \alpha^2 x^3 + x^2 + \alpha^6 x + \alpha^6$

两边同乘 $x$:$x^6 \equiv \alpha^2 x^4 + x^3 + \alpha^6 x^2 + \alpha^6 x$

把右边的 $x^4$ 再次替换掉：

$= \alpha^2 (\alpha^3 x^3 + x^2 + \alpha x + \alpha^3) + x^3 + \alpha^6 x^2 + \alpha^6 x$

$= \alpha^5 x^3   + \alpha^2x^2 + \alpha^3 x + \alpha^5 + x^3 + \alpha^6 x^2 + \alpha^6 x$

$= \alpha^5 + \alpha^4 x + x^2 + \alpha^4 x^3 + x^6$

因此有

$$\begin{align*}
c_0(x) &= \alpha^3 + \alpha x + x^2 + \alpha^3 x^3 + x^4 \\
c_1(x) &= \alpha^6 + \alpha^6 x + x^2 + \alpha^2 x^3 + x^5 \\
c_2(x) &= \alpha^5 + \alpha^4 x + x^2 + \alpha^4 x^3 + x^6
\end{align*}$$



```Plaintext
x^2 + 1        <-- 商 (Quotient)
          _______________
x^3+x+1  )  x^5 + 0 + 0 + 0 + 0 + 0
            x^5 + 0 + x^3 + x^2      <-- 第一步：用 x^2 乘除数 (x^3+x+1)
            -------------------
                  x^3 + x^2          <-- 减法结果(即异或)：x^5消掉了
                  x^3 + 0   + x + 1  <-- 第二步：用 1 乘除数 (x^3+x+1)
                  -----------------
                        x^2 + x + 1  <-- 余数 (Remainder)
```

