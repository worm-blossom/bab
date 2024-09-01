import { A, BibItemDeclaration, Em, I, M, P, Sup } from "../deps.ts";
import { BigOmega, Mathcal, MFrac } from "./macros.tsx";
import { BigO, BigTheta, Curly } from "./macros.tsx";

export const bib: BibItemDeclaration[] = [
  {
    item: `@online{blake3,
  author = {Jack O’Connor and Jean-Philippe Aumasson and Samuel Neves and Zooko Wilcox-O’Hearn},
  title = {BLAKE3},
  year = 2020,
  url = {https://github.com/BLAKE3-team/BLAKE3-specs/blob/master/blake3.pdf},
  urldate = {2024-09-01},
  note = {\\url{https://github.com/BLAKE3-team/BLAKE3-specs/blob/master/blake3.pdf}}
}`,
    asset: ["references", "blake3.pdf"],
    blurb: (
      <>
        <P>
          We present BLAKE3, an evolution of the BLAKE2 cryptographic hash that is both faster
          and also more consistently fast across different platforms and input sizes. BLAKE3
          supports an unbounded degree of parallelism, using a tree structure that scales up
          to any number of SIMD lanes and CPU cores. On Intel Cascade Lake-SP, peak
          single-threaded throughput is 4× that of BLAKE2b, 8× that of SHA-512, and 12×
          that of SHA-256, and it can scale further using multiple threads. BLAKE3 is also
          efficient on smaller architectures: throughput on a 32-bit ARM1176 core is 1.3× that
          of SHA-256 and 3× that of BLAKE2b and SHA-512. Unlike BLAKE2 and SHA-2, with
          different variants better suited for different platforms, BLAKE3 is a single algorithm
          with no variants. It provides a simplified API supporting all the use cases of BLAKE2,
          including keying and extendable output. The tree structure also supports new use
          cases, such as verified streaming and incremental updates.
        </P>
      </>
    ),
  },
  {
    item: `@inproceedings{tamassia2003authenticated,
  title={Authenticated data structures},
  author={Tamassia, Roberto},
  booktitle={Algorithms-ESA 2003: 11th Annual European Symposium, Budapest, Hungary, September 16-19, 2003. Proceedings 11},
  pages={2--5},
  year={2003},
  organization={Springer}
}

`,
    asset: ["references", "tamassia2003authenticated.pdf"],
    blurb: (
      <>
        <P>
            Authenticated data structures are a model of computation where untrusted responders answer queries on a data structure on behalf of a trusted source and provide a proof of the validity of the answer to the user. We present a survey of techniques for designing authenticated data structures and overview their computational efficiency. We also discuss implementation issues and practical applications.
        </P>
      </>
    ),
  },
  {
    item: `@article{bertoni2014sufficient,
  title={Sufficient conditions for sound tree and sequential hashing modes},
  author={Bertoni, Guido and Daemen, Joan and Peeters, Michaël and Van Assche, Gilles},
  journal={International Journal of Information Security},
  volume={13},
  pages={335--353},
  year={2014},
  publisher={Springer}
}
`,
    asset: ["references", "bertoni2014sufficient.pdf"],
    blurb: (
      <>
        <P>
        Hash functions are usually composed of a mode
        of operation on top of a concrete primitive with fixed input-
        length and fixed output-length, such as a block cipher or a permutation. In practice, the mode is often sequential, although
        parallel (or tree) hashing modes are also possible. The former
        requires less memory, while the latter has several advantages
        such as its inherent parallelism and a lower cost of hash value
        recomputation when only a small part of the input changes.
        In this paper, we consider the general case of (tree or sequential) hashing modes that make use of an underlying hash
        function, which may in turn be sequential. We formulate a
        set of three simple conditions for such a (tree or sequential)
        hashing mode to be <Em>sound</Em>. By sound, we mean that the advan-
        tage in differentiating a hash function obtained by applying
        a tree hashing mode to an ideal underlying hash function
        from an ideal monolithic hash function is upper bounded
        by <M>q^2 / 2^<Curly>n + 1</Curly></M> with <M>q</M> the number of queries to the underlying
        hash function and n the length of the chaining values. We
        provide a proof of soundness in the indifferentiability framework. The conditions we formulate are easy to implement
        and to verify and can be used by the practitioner to build a
        tree hashing mode on top of an existing hash function. We
        show how to apply tree hashing modes to sequential hash functions in an optimal way, demonstrate the applicability
        of our conditions with two efficient and simple tree hash-
        ing modes and provide a simple method to take the union of
        tree hashing modes that preserves soundness. It turns out that
        sequential hashing modes using a compression function (i.e.,
        a hash function with fixed input-length) can be considered as
        particular cases and, as a by-product, our results also apply
        to them. We discuss the different techniques for satisfying
        the three conditions, thereby shedding a new light on several
        published modes.
        </P>
      </>
    ),
  },
  {
    item: `@article{laurie2021certificate,
  title={Certificate transparency version 2.0},
  author={Laurie, Ben and Langley, Adam and Kasper, Emilia and Messeri, Eran and Stradling, Rob},
  journal={Internet Requests for Comments, RFC Editor, RFC},
  volume={9162},
  year={2021}
}
`,
    href: "https://datatracker.ietf.org/doc/html/rfc9162",
    blurb: (
      <>
        <P>
          This document describes version 2.0 of the Certificate Transparency (CT) protocol for publicly logging the existence of Transport Layer Security (TLS) server certificates as they are issued or observed, in a manner that allows anyone to audit certification authority (CA) activity and notice the issuance of suspect certificates as well as to audit the certificate logs themselves. The intent is that eventually clients would refuse to honor certificates that do not appear in a log, effectively forcing CAs to add all issued certificates to the logs.
        </P>
        <P>
          This document obsoletes RFC 6962. It also specifies a new TLS extension that is used to send various CT log artifacts.
        </P>
        <P>
          Logs are network services that implement the protocol operations for submissions and queries that are defined in this document.
        </P>
      </>
    ),
  },
  {
    item: `@article{daemen2018sound,
  title={Sound hashing modes of arbitrary functions, permutations, and block ciphers},
  author={Daemen, Joan and Mennink, Bart and Van Assche, Gilles},
  journal={IACR Transactions on Symmetric Cryptology},
  pages={197--228},
  year={2018}
}
`,
    asset: ["references", "daemen2018sound.pdf"],
    blurb: (
      <>
        <P>
          Cryptographic hashing modes come in many flavors, including Merkle-
          Damgård with various types of strengthening, Merkle trees, and sponge functions. As
          underlying primitives, these functions use arbitrary functions, permutations, or block
          ciphers. In this work we provide three simple proofs, one per primitive type, that
          cover all modes where the input to the primitive consists of message bits, chaining
          value bits, and bits that only depend on the mode and message length. Our approach
          generalizes and simplifies over earlier attempts of Dodis et al. (FSE 2009) and Bertoni
          et al. (Int. J. Inf. Sec. 2014). We prove tight indifferentiability bounds for modes
          using each of these three primitive types provided that the mode satisfies some easy
          to verify conditions.
        </P>
      </>
    ),
  },
];
