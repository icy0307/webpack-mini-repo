
export const treeShakingTestAsync = async () => {
    console.log('treeShakingTestAsync');
    // @ts-ignore
    if (false) {
        const { Baz } = await import(/* webpackChunkName: "bundle_mobile" */'./mobile');
        console.log(Baz);
    } else {
        const { foo } = await import(/* webpackChunkName: "bundle_pc" */ './pc');
        console.log(foo);
    }

};

