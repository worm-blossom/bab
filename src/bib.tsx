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
];
