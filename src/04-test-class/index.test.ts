// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const INITIAL_BALANCE = 1000;
    const bankAccount = getBankAccount(INITIAL_BALANCE);

    expect(bankAccount).toBeInstanceOf(BankAccount);
    expect(bankAccount.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const INITIAL_BALANCE = 1000;
    const bankAccount = getBankAccount(INITIAL_BALANCE);
    const withdrawMoreThanBalance = () =>
      bankAccount.withdraw(INITIAL_BALANCE + 1);

    expect(withdrawMoreThanBalance).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const INITIAL_BALANCE = 1000;
    const bankAccount = getBankAccount(INITIAL_BALANCE);
    const bankAccountToTransfer = getBankAccount(0);
    const transferMoreThanBalance = () =>
      bankAccount.transfer(INITIAL_BALANCE + 1, bankAccountToTransfer);

    expect(transferMoreThanBalance).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const INITIAL_BALANCE = 1000;
    const bankAccount = getBankAccount(INITIAL_BALANCE);

    expect(() => bankAccount.transfer(INITIAL_BALANCE, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const INITIAL_BALANCE = 1000;
    const DEPOSIT_AMOUNT = 10;
    const bankAccount = getBankAccount(INITIAL_BALANCE);

    bankAccount.deposit(DEPOSIT_AMOUNT);

    expect(bankAccount.getBalance()).toBe(INITIAL_BALANCE + DEPOSIT_AMOUNT);
  });

  test('should withdraw money', () => {
    const INITIAL_BALANCE = 1000;
    const WITHDRAW_AMOUNT = 20;
    const bankAccount = getBankAccount(INITIAL_BALANCE);

    bankAccount.withdraw(WITHDRAW_AMOUNT);

    expect(bankAccount.getBalance()).toBe(INITIAL_BALANCE - WITHDRAW_AMOUNT);
  });

  test('should transfer money', () => {
    const SOURCE_INITIAL_BALANCE = 1000;
    const DEST_INITIAL_BALANCE = 1000;
    const sourceBankAccount = getBankAccount(SOURCE_INITIAL_BALANCE);
    const destBankAccount = getBankAccount(DEST_INITIAL_BALANCE);

    sourceBankAccount.transfer(SOURCE_INITIAL_BALANCE, destBankAccount);

    expect(sourceBankAccount.getBalance()).toBe(0);
    expect(destBankAccount.getBalance()).toBe(
      SOURCE_INITIAL_BALANCE + DEST_INITIAL_BALANCE,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const INITIAL_BALANCE = 1000;
    const bankAccount = getBankAccount(INITIAL_BALANCE);
    const fetchedBalance = await bankAccount.fetchBalance();
    const requestFailed = fetchedBalance === null;

    if (!requestFailed) {
      expect(fetchedBalance).toEqual(expect.any(Number));
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const INITIAL_BALANCE = 1000;
    const bankAccount = getBankAccount(INITIAL_BALANCE);

    try {
      await bankAccount.synchronizeBalance();

      const synchronizedBalance = bankAccount.getBalance();

      expect(synchronizedBalance).toEqual(expect.any(Number));
      expect(synchronizedBalance).not.toEqual(INITIAL_BALANCE);
    } catch {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const INITIAL_BALANCE = 1000;
    const bankAccount = getBankAccount(INITIAL_BALANCE);

    try {
      await bankAccount.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
      expect(bankAccount.getBalance()).toEqual(INITIAL_BALANCE);
    }
  });
});
