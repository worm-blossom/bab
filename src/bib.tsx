import { A, BibItemDeclaration, Em, I, M, P, Sup } from "../deps.ts";
import { BigOmega, Mathcal, MFrac } from "./macros.tsx";
import { BigO, BigTheta, Curly } from "./macros.tsx";

export const bib: BibItemDeclaration[] = [
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
  author={Bertoni, Guido and Daemen, Joan and Peeters, Micha{\"e}l and Van Assche, Gilles},
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
];
