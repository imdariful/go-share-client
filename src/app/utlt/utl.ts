export const genRandonString = (length: number) => {
    const str = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia, felis at efficitur laoreet, magna sapien feugiat tellus, et maximus orci leo ac augue. Phasellus in mi mollis, facilisis dui a, posuere enim. Aliquam egestas, sem vitae sollicitudin tempor, turpis ligula interdum massa, vitae pulvinar nibh tellus a leo. Morbi quis quam in lorem vulputate fermentum eget a massa. Nulla iaculis dui ligula, eu tristique mauris tristique ac. Pellentesque sed consequat ligula. Cras pellentesque justo tellus. Suspendisse potenti. Donec in tellus tristique, laoreet felis eget, iaculis diam. Morbi vitae justo eros. Phasellus vel quam metus. Cras faucibus mattis ornare. Nullam nulla tellus, tristique ut volutpat vitae, tincidunt ut turpis. Sed molestie magna eget mi lobortis dictum. Sed gravida metus ut nisl scelerisque venenatis. Mauris vel consectetur nisl. Morbi porta vestibulum eros, ut sagittis ante tincidunt et. Phasellus vel iaculis tortor. In hac habitasse platea dictumst. Fusce ultrices arcu facilisis nisl."
    const strArr = str.split(' ');
    const result: string[] = [];
    for ( let i = 0; i < length; i++ ) {
       result.push(strArr[Math.floor(Math.random() * 100)]);
    }
    return result.join(' ');
 }

 export const getRandom= (n: number) => {
    return Math.ceil(Math.random() * n);
  }


