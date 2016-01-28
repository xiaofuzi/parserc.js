var pr = require('../lib/parserc'),
    state = require('../lib/state');


var parser = {
    /*
     * expr   : term ((PLUS | MINUS) term)*      
     * term   : factor ((MUL | DIV) factor)*
     * factor : INTEGER
     */
    expr: function(state) {
    	return pr.sequence(
            parser.term,
            pr.zeromore(
                pr.and(
                    parser.operater01,
                    parser.term
                )
            )
        )(state);
    }
};

/*
 * [+, -]
 */
parser.operater01 = pr.or(
    pr.literal("+"),
    pr.literal("-")
);

/*
 * [/, *]
 */
parser.operater02 = pr.or(
    pr.literal("*"),
    pr.literal("/")
)

parser.int = pr.integers();
parser.float = pr.sequence(
    parser.int,
    pr.literal('.'),
    parser.int
);
parser.num = pr.or(
    parser.float,
    parser.int
)

/*
 * parent_factor
 */
parser.parent_factor = pr.sequence(
    pr.literal('('),
    parser.expr,
    pr.literal(')')
)

/*
 * factor: INTEGER | expr
 */
parser.factor = pr.or(
        parser.num,
        parser.parent_factor
    )
    // parser.factor = parser.num;

/*
 * term : factor ((MUL | DIV) factor)*
 */
parser.term = pr.sequence(
    parser.factor,
    pr.zeromore(
        pr.and(
            parser.operater02,
            parser.factor
        )
    )
)


var mathState = state('(1+2)/(2-123)');

parser.expr(mathState);

console.log(mathState.match, mathState.success);
