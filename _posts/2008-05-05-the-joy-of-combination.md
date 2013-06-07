---
author: anant
comments: true
date: 2008-05-04 07:50:21-07:00
layout: post
slug: the-joy-of-combination
title: The joy of combination
wordpress_id: 1118
---

As some of you may already know, I've been working on the [Glendix](http://www.glendix.org/) project for quite some time now. The basic idea is to combine the [Linux kernel](http://kernel.org/) with utilities from [Plan 9](http://plan9.bell-labs.com/plan9/), in order to create a developer-oriented operating system distribution. I say it would combine the best of both worlds, but there are those who disagree!

I've been working on the project by splitting the project into two separate modules. The [first module](/2008/02/29/adventuring-with-aout/) was to make Linux understand the Plan 9 [a.out](http://plan9.bell-labs.com/magic/man2html?man=a.out&sect=6) binary format - and this was easily done by writing a kernel module, using existing binfmt functionality. The second part was to make Linux understand Plan 9 system calls, so it wouldn't choke when the binaries are actually executed.

The usual way in which user-space applications communicate with the kernel in almost all modern operating systems is via system calls. What differentiates these operating systems from each other in this aspect, are the number of calls, and the mechanism by which they are invoked.

For instance, Linux applications use the `INT` instruction to raise software interrupt `0x80` (We're only dealing with the x86 architecture here). The number stored in the accumulator (EAX) at the time the interrupt was raised is used to tell the kernel which system call is to be invoked. The arguments, if any, to the system call are passed via the other registers (`EBX`, `ECX`, `EDX`...) On the other hand, Plan 9 applications use interrupt number `0x40` (don't ask why) to invoke a system call. The system call number is put on the accumulator, but the arguments are passed just like to any other regular function - on the (user-space) stack.

Writing the code for this part turned out to be a little tricky, since: a) Linux does not give us a clean way to capture software interrupts, and b) the argument passing convention is different. I finally resorted to patching the kernel rather than writing a module. Brute force, but it works!

So, till now, each of the two modules were working as expected when tested individually. I tested the first module by assembling a program using Linux conventions in Plan 9:

``` gas
DATA  string<>+0(SB)/8, $"Linux\n\z\z"
GLOBL string<>+0(SB), $8

TEXT  _main+0(SB), 1, $0

# Arguments for write(2)
MOVL $1, BX
MOVL $string<>+0(SB), CX
MOVL $7, DX

# Number for sys_write is 4
MOVL $4, AX
INT  $0x80

# Argument for exit(2)
MOVL $0, BX

# Number for sys_exit is 1
MOVL $1, AX
INT  $0x80
```

After running `8a hello.s; 8l hello.8`, copying the executable to Linux and running it, it worked. The other module, I tested by writing a program for [nasm](http://replay.waybackmachine.org/20080603015642/http://nasm.sourceforge.net/) in Linux, but this time using Plan 9 conventions:

``` gas
section .data
    hello: db 'Hello World!', 10
    hlen: equ $-hello

section .text
    global _start

_start:
    # 4 arguments for plan 9's pwrite call
    # last one is vlong (8 bytes)
    push 1
    push hello
    push hlen
    push 0
    push 0

    # syscall number for pwrite is 51
    mov eax, 51
    int 64

    # sycall number for exit is 8
    mov eax, 8
    int 64
```

After running `nasm -f elf hello.asm; ld -o hello hello.o; ./hello`, the output came onto the screen as expected. Now, the moment of truth, the ultimate test, was to combine the two portions of the project and run a Plan 9 executable directly on Linux!

``` bash
$ ./convert 8.out
P9: 1eb 4af9 94c 314 1034
P9: Padding 4b19 bytes from 4af9
Done! Output written to linux.out
$ ./linux.out
Segmentation fault
$ dmesg | tail -n 1
linux.out[7762]: segfault at c0000000 eip 00001051 esp bfffffb8 error 5
```

Damn, what went wrong? The first step was to find out what `error 5` meant. The _[strerror](http://replay.waybackmachine.org/20080603015642/http://www.opengroup.org/onlinepubs/000095399/functions/strerror.html)_ function is supposed to be used for returning meaningful strings corresponding to cryptic error numbers, but all I got as output, a small program later, was 'Input/output error'. Big help that was.

Closer inspection of `eip` and `esp` revealed a bug in the loader I wrote earlier. The instruction at address `0x1051` was a `MOVL` to a stack offset `(4(SP))`, which resolved to `0xC0000000`. However, the main function also receives arguments (namely `argc` and `argv`), so the loader had to accommodate those values and set the stack pointer to a little lower value (which is around `0xBFFFF000` in the average case). Voila, the hello world program worked after that small tweak. Ah, the joy of combination!

We're still a while away from getting [_8c_](http://plan9.bell-labs.com/magic/man2html?man=8c&sect=1) to run though, I'm going to be implementing all the system calls it needs one by one, starting with _[brk](http://plan9.bell-labs.com/magic/man2html?man=brk&sect=2)_. Updated sources can be found [here](http://hg.glendix.org/glendix/). See you later!
